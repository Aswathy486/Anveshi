import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# -----------------------------
# CREATE REPORT
# -----------------------------
class ReportCreate(BaseModel):
    report_type: str
    title: str
    category: str
    description: str
    location: str
    specific_location: Optional[str] = None

    date: datetime.date
    time: Optional[datetime.time] = None

    reporter_name: str
    programme: str
    semester: str
    contact_number: str

    image_url: Optional[str] = None


# -----------------------------
# UPDATE REPORT
# -----------------------------
class ReportUpdate(BaseModel):
    report_type: Optional[str] = None
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    specific_location: Optional[str] = None

    date: Optional[datetime.date] = None
    time: Optional[datetime.time] = None

    reporter_name: Optional[str] = None
    programme: Optional[str] = None
    semester: Optional[str] = None
    contact_number: Optional[str] = None

    image_url: Optional[str] = None
    status: Optional[str] = None


# -----------------------------
# RESPONSE MODEL
# -----------------------------
class ReportResponse(BaseModel):
    id: int
    report_id: str

    report_type: str
    title: str
    category: str
    description: str

    location: str
    specific_location: Optional[str] = None

    date: datetime.date
    time: Optional[datetime.time] = None

    reporter_name: str
    programme: str
    semester: str
    contact_number: str

    image_url: Optional[str] = None
    status: str

    created_at: datetime.datetime

    model_config = ConfigDict(from_attributes=True)