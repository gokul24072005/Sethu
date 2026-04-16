
# Your Company Website

A full-stack web application with FastAPI backend and React frontend.

## Setup

### Backend

1. Install dependencies: `pip install -r backend/requirements.txt`

2. Set up PostgreSQL database and update .env

3. Run migrations: `alembic upgrade head`

4. Start server: `uvicorn backend.app.main:app --reload`

### Frontend

1. Change into the frontend folder: `cd YourCompanyWebsite/frontend`

2. Install dependencies: `npm install`

3. Start dev server: `npm start`

   - or run `npm run dev` as an alias for the same command

## Features

- Contact form with backend API

- Responsive design

