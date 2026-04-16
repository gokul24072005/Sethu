from sqlalchemy import Column, Integer, LargeBinary, String
from .database import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    service = Column(String, nullable=True)
    message = Column(String)


class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    rating = Column(Integer)
    message = Column(String)


class CareerApplication(Base):
    __tablename__ = "career_applications"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String, nullable=True)
    position = Column(String, index=True)
    experience = Column(String, nullable=True)
    message = Column(String)
    resume_filename = Column(String, nullable=True)
    resume_url = Column(String, nullable=True)
    resume_content_type = Column(String, nullable=True)
