import os
import smtplib
import ssl
from email.message import EmailMessage
from pathlib import Path
from typing import Any
from dotenv import load_dotenv
from .schemas import ContactCreate, FeedbackCreate

load_dotenv(Path(__file__).resolve().parents[1] / ".env")


def send_quote_notification(contact: ContactCreate) -> None:
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    smtp_sender = os.getenv("SMTP_SENDER_EMAIL") or smtp_username
    smtp_receiver = os.getenv("QUOTE_RECEIVER_EMAIL", "sethu2004220@gmail.com")
    smtp_use_tls = os.getenv("SMTP_USE_TLS", "true").lower() == "true"

    if not smtp_username or not smtp_password or not smtp_sender:
        raise RuntimeError(
            "SMTP credentials are not configured. Set SMTP_USERNAME, SMTP_PASSWORD, and SMTP_SENDER_EMAIL in backend/.env"
        )

    message = EmailMessage()
    message["Subject"] = f"New Quote Request - {contact.name}"
    message["From"] = smtp_sender
    message["To"] = smtp_receiver
    message.set_content(
        "\n".join(
            [
                "A new quote request was submitted from the website.",
                "",
                f"Name: {contact.name}",
                f"Email: {contact.email}",
                f"Service: {contact.service or 'Not specified'}",
                "",
                "Message:",
                contact.message,
            ]
        )
    )

    with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as smtp:
        smtp.ehlo()
        if smtp_use_tls:
            smtp.starttls(context=ssl.create_default_context())
            smtp.ehlo()
        smtp.login(smtp_username, smtp_password)
        smtp.send_message(message)


def send_feedback_notification(feedback: FeedbackCreate) -> None:
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    smtp_sender = os.getenv("SMTP_SENDER_EMAIL") or smtp_username
    smtp_receiver = os.getenv("FEEDBACK_RECEIVER_EMAIL", "sethu2004220@gmail.com")
    smtp_use_tls = os.getenv("SMTP_USE_TLS", "true").lower() == "true"

    if not smtp_username or not smtp_password or not smtp_sender:
        raise RuntimeError(
            "SMTP credentials are not configured. Set SMTP_USERNAME, SMTP_PASSWORD, and SMTP_SENDER_EMAIL in backend/.env"
        )

    message = EmailMessage()
    message["Subject"] = f"New Feedback - {feedback.name}"
    message["From"] = smtp_sender
    message["To"] = smtp_receiver
    message.set_content(
        "\n".join(
            [
                "A new feedback submission was received from the website.",
                "",
                f"Name: {feedback.name}",
                f"Email: {feedback.email}",
                f"Rating: {feedback.rating}/5",
                "",
                "Message:",
                feedback.message,
            ]
        )
    )

    with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as smtp:
        smtp.ehlo()
        if smtp_use_tls:
            smtp.starttls(context=ssl.create_default_context())
            smtp.ehlo()
        smtp.login(smtp_username, smtp_password)
        smtp.send_message(message)


def _normalize_pdf_filename(filename: str | None) -> str:
    base_name = (filename or "resume").strip() or "resume"
    if not base_name.lower().endswith(".pdf"):
        return f"{base_name}.pdf"
    return base_name


def send_career_notification(career: Any, resume_bytes: bytes | None = None) -> None:
    """
    Send email notification for a career application.
    """
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    smtp_sender = os.getenv("SMTP_SENDER_EMAIL") or smtp_username
    smtp_receiver = (
        os.getenv("CAREER_RECEIVER_EMAIL")
        or os.getenv("QUOTE_RECEIVER_EMAIL")
        or "sethu2004220@gmail.com"
    )
    smtp_use_tls = os.getenv("SMTP_USE_TLS", "true").lower() == "true"

    if not smtp_username or not smtp_password or not smtp_sender:
        raise RuntimeError(
            "SMTP credentials are not configured. Set SMTP_USERNAME, SMTP_PASSWORD, and SMTP_SENDER_EMAIL in backend/.env"
        )

    message = EmailMessage()
    message["Subject"] = f"New Career Application - {career.name}"
    message["From"] = smtp_sender
    message["To"] = smtp_receiver
    message.set_content(
        "\n".join(
            [
                "A new career application was submitted from the website.",
                "",
                f"Name: {career.name}",
                f"Email: {career.email}",
                f"Phone: {career.phone or 'Not specified'}",
                f"Position: {career.position or 'Not specified'}",
                f"Experience: {career.experience or 'Not specified'}",
                f"Resume Filename: {career.resume_filename or 'Not provided'}",
                "",
                "Message:",
                career.message or "Not provided",
            ]
        )
    )

    resume_data = resume_bytes or getattr(career, "resume_data", None)
    if isinstance(resume_data, memoryview):
        resume_data = resume_data.tobytes()

    if resume_data:
        message.add_attachment(
            resume_data,
            maintype="application",
            subtype="pdf",
            filename=_normalize_pdf_filename(getattr(career, "resume_filename", None)),
        )

    with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as smtp:
        smtp.ehlo()
        if smtp_use_tls:
            smtp.starttls(context=ssl.create_default_context())
            smtp.ehlo()
        smtp.login(smtp_username, smtp_password)
        smtp.send_message(message)


def send_career_candidate_acknowledgement(career: Any) -> None:
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    smtp_sender = os.getenv("SMTP_SENDER_EMAIL") or smtp_username
    noreply_sender = os.getenv("CAREER_NOREPLY_EMAIL") or smtp_sender
    smtp_use_tls = os.getenv("SMTP_USE_TLS", "true").lower() == "true"

    if not smtp_username or not smtp_password or not noreply_sender:
        raise RuntimeError(
            "SMTP credentials are not configured. Set SMTP_USERNAME, SMTP_PASSWORD, and SMTP_SENDER_EMAIL in backend/.env"
        )

    candidate_email = getattr(career, "email", None)
    if not candidate_email:
        return

    hiring_reply_to = (
        os.getenv("CAREER_RECEIVER_EMAIL")
        or os.getenv("QUOTE_RECEIVER_EMAIL")
        or smtp_sender
    )

    message = EmailMessage()
    message["Subject"] = "Application Received - IZone Technology"
    message["From"] = f"IZone Technology No-Reply <{noreply_sender}>"
    message["To"] = candidate_email
    message["Reply-To"] = hiring_reply_to
    message.set_content(
        "\n".join(
            [
                f"Hi {career.name},",
                "",
                "Thank you for applying at IZone Technology.",
                "We have received your application and our hiring team will review it shortly.",
                "",
                f"Position: {career.position or 'Not specified'}",
                "",
                "This is an automated no-reply email. Please do not reply directly to this message.",
                f"For queries, contact: {hiring_reply_to}",
            ]
        )
    )

    with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as smtp:
        smtp.ehlo()
        if smtp_use_tls:
            smtp.starttls(context=ssl.create_default_context())
            smtp.ehlo()
        smtp.login(smtp_username, smtp_password)
        smtp.send_message(message)
