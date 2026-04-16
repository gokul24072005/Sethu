import logging

from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db
from ..email_utils import send_quote_notification
from ..excel_utils import append_enquiry_record

router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)


def _append_enquiry_record_safe(task_payload: dict[str, str | None]) -> None:
    try:
        append_enquiry_record(
            name=task_payload["name"] or "",
            email=task_payload["email"] or "",
            service=task_payload["service"],
            message=task_payload["message"] or "",
        )
    except Exception as exc:
        logger.warning("Quote saved but Excel write failed: %s", exc)


def _send_quote_notification_safe(task_payload: dict[str, str | None]) -> None:
    try:
        contact_payload = schemas.ContactCreate(
            name=task_payload["name"] or "",
            email=task_payload["email"] or "",
            service=task_payload["service"],
            message=task_payload["message"] or "",
        )
        send_quote_notification(contact_payload)
    except Exception as exc:
        logger.warning("Quote saved but email delivery failed: %s", exc)


@router.post("/contacts/", response_model=schemas.Contact, status_code=201)
def create_contact(
    contact: schemas.ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    db_contact = crud.create_contact(db=db, contact=contact)
    task_payload = {
        "name": db_contact.name,
        "email": db_contact.email,
        "service": db_contact.service,
        "message": db_contact.message,
    }

    background_tasks.add_task(_append_enquiry_record_safe, task_payload)
    background_tasks.add_task(_send_quote_notification_safe, task_payload)

    return db_contact

@router.get("/contacts/", response_model=list[schemas.Contact])
def read_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    contacts = crud.get_contacts(db, skip=skip, limit=limit)
    return contacts
