import logging
import os
import re
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, HTTPException, Request, UploadFile
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db
from ..email_utils import (
    send_career_candidate_acknowledgement,
    send_career_notification,
)
from ..excel_utils import append_career_record

router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)

ALLOWED_RESUME_EXTENSIONS = {".pdf"}
MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB
RESUME_STORAGE_DIR = Path(__file__).resolve().parents[2] / "uploads" / "resumes"
RESUME_PUBLIC_BASE_URL_ENV = "RESUME_PUBLIC_BASE_URL"
SAFE_FILENAME_PATTERN = re.compile(r"[^A-Za-z0-9_-]+")


def _append_career_record_safe(
    name: str,
    email: str,
    phone: str,
    position: str,
    resume_url: str,
) -> None:
    try:
        append_career_record(
            name=name,
            email=email,
            phone=phone,
            position=position,
            resume_url=resume_url,
        )
    except Exception as exc:
        logger.warning("Career saved but Excel write failed: %s", exc)


def _send_career_notification_safe(career_payload: schemas.CareerCreate) -> None:
    try:
        send_career_notification(career_payload)
    except Exception as exc:
        logger.warning("Career saved but email delivery failed: %s", exc)


def _send_candidate_acknowledgement_safe(career_payload: schemas.CareerCreate) -> None:
    try:
        send_career_candidate_acknowledgement(career_payload)
    except Exception as exc:
        logger.warning("Career saved but candidate acknowledgement failed: %s", exc)


def _sanitize_resume_stem(filename: str | None) -> str:
    stem = Path(filename or "resume").stem.strip().lower() or "resume"
    sanitized = SAFE_FILENAME_PATTERN.sub("_", stem).strip("_")
    return sanitized or "resume"


def _save_resume_file(resume_bytes: bytes, original_filename: str | None) -> str:
    RESUME_STORAGE_DIR.mkdir(parents=True, exist_ok=True)
    safe_stem = _sanitize_resume_stem(original_filename)
    stored_filename = f"{safe_stem}_{uuid4().hex}.pdf"
    output_path = RESUME_STORAGE_DIR / stored_filename
    output_path.write_bytes(resume_bytes)
    return stored_filename


def _build_resume_url(request: Request, stored_filename: str) -> str:
    configured_base_url = os.getenv(RESUME_PUBLIC_BASE_URL_ENV, "").strip()
    if configured_base_url:
        return f"{configured_base_url.rstrip('/')}/resumes/{stored_filename}"
    return str(request.url_for("resume_files", path=stored_filename))


@router.post("/careers/", response_model=schemas.Career, status_code=201)
def create_career_application(
    background_tasks: BackgroundTasks,
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    phone: str | None = Form(None),
    position: str = Form(...),
    experience: str | None = Form(None),
    message: str = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # Validate resume file type
    extension = Path(resume.filename or "").suffix.lower()
    if extension not in ALLOWED_RESUME_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Resume must be in PDF format")

    # Read resume bytes
    resume_bytes = resume.file.read()
    if not resume_bytes:
        raise HTTPException(status_code=400, detail="Resume file is empty")
    if len(resume_bytes) > MAX_RESUME_SIZE_BYTES:
        raise HTTPException(
            status_code=400, detail="Resume file size must be 5 MB or less"
        )

    try:
        stored_resume_filename = _save_resume_file(resume_bytes, resume.filename)
    except OSError:
        logger.exception("Failed to save resume file to storage.")
        raise HTTPException(
            status_code=500,
            detail="Resume upload failed. Please try again.",
        )

    resume_url = _build_resume_url(request, stored_resume_filename)

    # Prepare career payload
    career_payload = schemas.CareerCreate(
        name=name,
        email=email,
        phone=phone,
        position=position,
        experience=experience,
        message=message,
        resume_filename=resume.filename,
        resume_url=resume_url,
        resume_content_type="application/pdf",
    )

    # Save to database
    db_career = crud.create_career_application(db=db, career=career_payload)

    career_task_payload = schemas.CareerCreate(
        name=db_career.name,
        email=db_career.email,
        phone=db_career.phone,
        position=db_career.position,
        experience=db_career.experience,
        message=db_career.message,
        resume_filename=db_career.resume_filename,
        resume_url=db_career.resume_url,
        resume_content_type=db_career.resume_content_type,
    )

    background_tasks.add_task(
        _append_career_record_safe,
        db_career.name,
        db_career.email,
        db_career.phone or "",
        db_career.position,
        db_career.resume_url or "",
    )
    background_tasks.add_task(_send_career_notification_safe, career_task_payload)
    background_tasks.add_task(_send_candidate_acknowledgement_safe, career_task_payload)

    return db_career


@router.get("/careers/", response_model=list[schemas.Career])
def read_career_applications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve a list of career applications from the database.
    """
    careers = crud.get_career_applications(db, skip=skip, limit=limit)
    return careers
