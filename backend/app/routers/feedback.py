import logging

from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db
from ..email_utils import send_feedback_notification
from ..excel_utils import append_feedback_record

router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)


def _append_feedback_record_safe(task_payload: dict[str, str | int]) -> None:
    try:
        append_feedback_record(
            name=str(task_payload["name"]),
            email=str(task_payload["email"]),
            rating=int(task_payload["rating"]),
            message=str(task_payload["message"]),
        )
    except Exception as exc:
        logger.warning("Feedback saved but Excel write failed: %s", exc)


def _send_feedback_notification_safe(task_payload: dict[str, str | int]) -> None:
    try:
        feedback_payload = schemas.FeedbackCreate(
            name=str(task_payload["name"]),
            email=str(task_payload["email"]),
            rating=int(task_payload["rating"]),
            message=str(task_payload["message"]),
        )
        send_feedback_notification(feedback_payload)
    except Exception as exc:
        logger.warning("Feedback saved but email delivery failed: %s", exc)


@router.post("/feedbacks/", response_model=schemas.Feedback)
def create_feedback(
    feedback: schemas.FeedbackCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    db_feedback = crud.create_feedback(db=db, feedback=feedback)
    task_payload = {
        "name": db_feedback.name,
        "email": db_feedback.email,
        "rating": db_feedback.rating,
        "message": db_feedback.message,
    }

    background_tasks.add_task(_append_feedback_record_safe, task_payload)
    background_tasks.add_task(_send_feedback_notification_safe, task_payload)

    return db_feedback


@router.get("/feedbacks/", response_model=list[schemas.Feedback])
def read_feedbacks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    feedbacks = crud.get_feedbacks(db, skip=skip, limit=limit)
    return feedbacks
