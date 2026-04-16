from sqlalchemy.orm import Session
from . import models, schemas

def create_contact(db: Session, contact: schemas.ContactCreate):
    db_contact = models.Contact(
        name=contact.name,
        email=contact.email,
        service=contact.service,
        message=contact.message
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def get_contacts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Contact).offset(skip).limit(limit).all()


def create_feedback(db: Session, feedback: schemas.FeedbackCreate):
    db_feedback = models.Feedback(
        name=feedback.name,
        email=feedback.email,
        rating=feedback.rating,
        message=feedback.message
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback


def get_feedbacks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Feedback).offset(skip).limit(limit).all()


def create_career_application(db: Session, career: schemas.CareerCreate):
    db_career = models.CareerApplication(
        name=career.name,
        email=career.email,
        phone=career.phone,
        position=career.position,
        experience=career.experience,
        message=career.message,
        resume_filename=career.resume_filename,
        resume_url=career.resume_url,
        resume_content_type=career.resume_content_type
    )
    db.add(db_career)
    db.commit()
    db.refresh(db_career)
    return db_career


def get_career_applications(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.CareerApplication).offset(skip).limit(limit).all()
