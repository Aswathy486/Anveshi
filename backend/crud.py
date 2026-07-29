from sqlalchemy.orm import Session

import models
import schemas


def generate_report_id(db: Session):
    last_report = (
        db.query(models.Report)
        .order_by(models.Report.id.desc())
        .first()
    )

    if last_report is None:
        return "ANV-0001"

    last_number = int(last_report.report_id.split("-")[1])
    new_number = last_number + 1

    return f"ANV-{new_number:04d}"


# -----------------------------
# CREATE REPORT
# -----------------------------
def create_report(
    db: Session,
    report: schemas.ReportCreate,
    image_path: str | None = None
):
    db_report = models.Report(
        report_type=report.report_type,
        title=report.title,
        category=report.category,
        description=report.description,
        location=report.location,
        specific_location=report.specific_location,
        date=report.date,
        time=report.time,
        reporter_name=report.reporter_name,
        programme=report.programme,
        semester=report.semester,
        contact_number=report.contact_number,
        image_url=image_path,
        report_id=generate_report_id(db),
        status="Active"
    )

    db.add(db_report)
    db.commit()
    db.refresh(db_report)

    return db_report


# -----------------------------
# GET ALL REPORTS
# -----------------------------
def get_reports(db: Session):
    return db.query(models.Report).all()


# -----------------------------
# GET REPORT BY ID
# -----------------------------
def get_report_by_id(db: Session, report_id: int):
    return (
        db.query(models.Report)
        .filter(models.Report.id == report_id)
        .first()
    )


# -----------------------------
# UPDATE REPORT
# -----------------------------
def update_report(
    db: Session,
    report_id: int,
    report: schemas.ReportUpdate,
    image_path: str | None = None,
):
    db_report = (
        db.query(models.Report)
        .filter(models.Report.id == report_id)
        .first()
    )

    if db_report is None:
        return None

    update_data = report.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_report, key, value)

    # Update image only if a new one was uploaded
    if image_path:
        db_report.image_url = image_path

    db.commit()
    db.refresh(db_report)

    return db_report



# -----------------------------
# DELETE REPORT
# -----------------------------
def delete_report(db: Session, report_id: int):
    db_report = (
        db.query(models.Report)
        .filter(models.Report.id == report_id)
        .first()
    )

    if db_report is None:
        return None

    db.delete(db_report)
    db.commit()

    return db_report