from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
import os
from pathlib import Path
from . import models
from .database import engine
from .routers import career, contact, feedback

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
RESUME_STORAGE_DIR = Path(__file__).resolve().parents[1] / "uploads" / "resumes"
RESUME_STORAGE_DIR.mkdir(parents=True, exist_ok=True)

allowed_origins = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router)
app.include_router(feedback.router)
app.include_router(career.router)
app.mount("/resumes", StaticFiles(directory=RESUME_STORAGE_DIR), name="resume_files")

@app.on_event("startup")
def check_database_connection():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
        conn.execute(text("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS service VARCHAR"))
        conn.execute(text("ALTER TABLE career_applications ADD COLUMN IF NOT EXISTS resume_filename VARCHAR"))
        conn.execute(text("ALTER TABLE career_applications ADD COLUMN IF NOT EXISTS resume_url VARCHAR"))
        conn.execute(text("ALTER TABLE career_applications ADD COLUMN IF NOT EXISTS resume_content_type VARCHAR"))
        conn.commit()

@app.get("/")
def read_root():
    return {"Hello": "World"}
