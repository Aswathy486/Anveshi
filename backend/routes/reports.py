from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    UploadFile,
    File,
    Form,
)
from sqlalchemy.orm import Session
from datetime import date, time
import os
import shutil

import crud
import schemas
from database import SessionLocal

router = APIRouter(
    prefix="",
    tags=["Reports"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# CREATE REPORT
# -----------------------------
@router.post(
    "/reports",
    response_model=schemas.ReportResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_report(
    report_type: str = Form(...),
    title: str = Form(...),
    category: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    specific_location: str | None = Form(None),
    date: date = Form(...),
    time: time | None = Form(None),
    reporter_name: str = Form(...),
    programme: str = Form(...),
    semester: str = Form(...),
    contact_number: str = Form(...),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    image_path = None

    if image:
        os.makedirs("uploads", exist_ok=True)

        filename = image.filename
        filepath = os.path.join("uploads", filename)

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        image_path = filepath

    report = schemas.ReportCreate(
        report_type=report_type,
        title=title,
        category=category,
        description=description,
        location=location,
        specific_location=specific_location,
        date=date,
        time=time,
        reporter_name=reporter_name,
        programme=programme,
        semester=semester,
        contact_number=contact_number,
        image_url=image_path,
    )

    return crud.create_report(db, report, image_path)


# -----------------------------
# GET ALL REPORTS
# -----------------------------
@router.get(
    "/reports",
    summary="Get all reports",
)
def get_reports(db: Session = Depends(get_db)):
    return crud.get_reports(db)


# -----------------------------
# GET SINGLE REPORT
# -----------------------------
@router.get(
    "/reports/{report_id}",
    response_model=schemas.ReportResponse,
)
def get_report(
    report_id: int,
    db: Session = Depends(get_db),
):
    report = crud.get_report_by_id(db, report_id)

    if report is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return report


# -----------------------------
# UPDATE REPORT
# -----------------------------
@router.put(
    "/reports/{report_id}",
    response_model=schemas.ReportResponse,
)
def update_report(
    report_id: int,
    report_type: str = Form(...),
    title: str = Form(...),
    category: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    specific_location: str | None = Form(None),
    date: date = Form(...),
    time: time | None = Form(None),
    reporter_name: str = Form(...),
    programme: str = Form(...),
    semester: str = Form(...),
    contact_number: str = Form(...),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    image_path = None

    if image:
        os.makedirs("uploads", exist_ok=True)

        filename = image.filename
        filepath = os.path.join("uploads", filename)

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        image_path = filepath

    report = schemas.ReportUpdate(
        report_type=report_type,
        title=title,
        category=category,
        description=description,
        location=location,
        specific_location=specific_location,
        date=date,
        time=time,
        reporter_name=reporter_name,
        programme=programme,
        semester=semester,
        contact_number=contact_number,
    )

    updated_report = crud.update_report(
        db,
        report_id,
        report,
        image_path,
    )

    if updated_report is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return updated_report


# -----------------------------
# DELETE REPORT
# -----------------------------
@router.delete("/reports/{report_id}")
def delete_report(
    report_id: int,
    db: Session = Depends(get_db),
):
    deleted_report = crud.delete_report(
        db,
        report_id,
    )

    if deleted_report is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return {
        "message": "Report deleted successfully"
    }