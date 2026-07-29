from sqlalchemy import Column, Integer, String, Date, Time, DateTime
from sqlalchemy.sql import func

from database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)

    report_id = Column(String, unique=True, nullable=False)

    report_type = Column(String, nullable=False)

    title = Column(String, nullable=False)

    category = Column(String, nullable=False)

    description = Column(String, nullable=False)

    location = Column(String, nullable=False)

    specific_location = Column(String)

    date = Column(Date, nullable=False)

    time = Column(Time)

    reporter_name = Column(String, nullable=False)

    programme = Column(String, nullable=False)

    semester = Column(String, nullable=False)

    contact_number = Column(String, nullable=False)

    image_url = Column(String)

    status = Column(String, default="Active")

    created_at = Column(DateTime(timezone=True), server_default=func.now())