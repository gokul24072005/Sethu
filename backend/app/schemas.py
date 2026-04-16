from pydantic import BaseModel, Field, ConfigDict

class ContactCreate(BaseModel):
    name: str
    email: str
    service: str | None = None
    message: str

class Contact(BaseModel):
    id: int
    name: str
    email: str
    service: str | None = None
    message: str

    model_config = ConfigDict(from_attributes=True)


class FeedbackCreate(BaseModel):
    name: str
    email: str
    rating: int = Field(ge=1, le=5)
    message: str


class Feedback(BaseModel):
    id: int
    name: str
    email: str
    rating: int
    message: str

    model_config = ConfigDict(from_attributes=True)


class CareerCreate(BaseModel):
    name: str
    email: str
    phone: str | None = None
    position: str
    experience: str | None = None
    message: str
    resume_filename: str | None = None
    resume_url: str | None = None
    resume_content_type: str | None = None


class Career(BaseModel):
    id: int
    name: str
    email: str
    phone: str | None = None
    position: str
    experience: str | None = None
    message: str
    resume_filename: str | None = None
    resume_url: str | None = None
    resume_content_type: str | None = None

    model_config = ConfigDict(from_attributes=True)
