from fastapi import FastAPI
from database import engine
from models import Base
from fastapi.staticfiles import StaticFiles
import os
from routes import reports

from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://anveshi-org.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(reports.router)


@app.get("/")
def root():
    return {
        "message": "Welcome to the Anveshi API 🚀"
    }