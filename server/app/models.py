from datetime import date, datetime
from enum import Enum
from typing import Any

from sqlalchemy import (
    JSON,
    Date,
    Enum as SAEnum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base, TimestampMixin


class UserRole(str, Enum):
    executive = "executive"
    faculty = "faculty"
    placement = "placement"
    admin = "admin"


class User(TimestampMixin, Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    hashed_password: Mapped[str] = mapped_column(String(255))
    role: Mapped[UserRole] = mapped_column(SAEnum(UserRole), default=UserRole.executive)
    is_active: Mapped[bool] = mapped_column(default=True)


class Student(TimestampMixin, Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(primary_key=True)
    roll_no: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    batch: Mapped[str] = mapped_column(String(50), index=True)
    program: Mapped[str] = mapped_column(String(100))
    custom_fields: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)


class Faculty(TimestampMixin, Base):
    __tablename__ = "faculty"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    designation: Mapped[str | None] = mapped_column(String(100))
    email: Mapped[str | None] = mapped_column(String(255), unique=True)
    custom_fields: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)


class Course(TimestampMixin, Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    credits: Mapped[float] = mapped_column(Float, default=0)
    semester: Mapped[str] = mapped_column(String(50), index=True)


class Enrollment(TimestampMixin, Base):
    __tablename__ = "enrollments"

    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), index=True)
    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"), index=True)
    grade: Mapped[str | None] = mapped_column(String(10))
    cgpa: Mapped[float | None] = mapped_column(Float)
    attendance_pct: Mapped[float | None] = mapped_column(Float)
    internal_score: Mapped[float | None] = mapped_column(Float)

    student: Mapped[Student] = relationship()
    course: Mapped[Course] = relationship()


class SyllabusProgress(TimestampMixin, Base):
    __tablename__ = "syllabus_progress"

    id: Mapped[int] = mapped_column(primary_key=True)
    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"), index=True)
    week: Mapped[int] = mapped_column(Integer)
    planned_pct: Mapped[float] = mapped_column(Float)
    actual_pct: Mapped[float] = mapped_column(Float)

    course: Mapped[Course] = relationship()


class Company(TimestampMixin, Base):
    __tablename__ = "companies"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), unique=True)
    sector: Mapped[str | None] = mapped_column(String(50))


class Drive(TimestampMixin, Base):
    __tablename__ = "drives"

    id: Mapped[int] = mapped_column(primary_key=True)
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"), index=True)
    scheduled_date: Mapped[date] = mapped_column(Date)
    role: Mapped[str | None] = mapped_column(String(255))

    company: Mapped[Company] = relationship()


class Offer(TimestampMixin, Base):
    __tablename__ = "offers"

    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), index=True)
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"), index=True)
    drive_id: Mapped[int | None] = mapped_column(ForeignKey("drives.id"))
    ctc: Mapped[float | None] = mapped_column(Float)
    offered_on: Mapped[date] = mapped_column(Date)

    student: Mapped[Student] = relationship()
    company: Mapped[Company] = relationship()


class SkillTag(TimestampMixin, Base):
    __tablename__ = "skill_tags"

    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), index=True)
    skill: Mapped[str] = mapped_column(String(100))

    student: Mapped[Student] = relationship()


class InterviewFeedback(TimestampMixin, Base):
    __tablename__ = "interview_feedback"

    id: Mapped[int] = mapped_column(primary_key=True)
    drive_id: Mapped[int] = mapped_column(ForeignKey("drives.id"), index=True)
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"))
    weakness: Mapped[str] = mapped_column(Text)


class Project(TimestampMixin, Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    kind: Mapped[str | None] = mapped_column(String(50))  # capstone | rnd
    lead_faculty_id: Mapped[int | None] = mapped_column(ForeignKey("faculty.id"))
    status: Mapped[str | None] = mapped_column(String(50))
    custom_fields: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)


class Grant(TimestampMixin, Base):
    __tablename__ = "grants"

    id: Mapped[int] = mapped_column(primary_key=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), index=True)
    source: Mapped[str | None] = mapped_column(String(100))  # industry | govt
    approved_amount: Mapped[float | None] = mapped_column(Float)
    disbursed_amount: Mapped[float | None] = mapped_column(Float)
    utilized_amount: Mapped[float | None] = mapped_column(Float)
    expiry_date: Mapped[date | None] = mapped_column(Date)


class Milestone(TimestampMixin, Base):
    __tablename__ = "milestones"

    id: Mapped[int] = mapped_column(primary_key=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), index=True)
    title: Mapped[str] = mapped_column(String(255))
    due_date: Mapped[date] = mapped_column(Date)
    status: Mapped[str | None] = mapped_column(String(50))  # pending | completed

    project: Mapped[Project] = relationship()


class Patent(TimestampMixin, Base):
    __tablename__ = "patents"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    status: Mapped[str | None] = mapped_column(String(50))  # provisional | filed | granted | licensed
    filed_date: Mapped[date | None] = mapped_column(Date)
    faculty_id: Mapped[int | None] = mapped_column(ForeignKey("faculty.id"))


class Publication(TimestampMixin, Base):
    __tablename__ = "publications"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(500))
    venue: Mapped[str | None] = mapped_column(String(255))
    year: Mapped[int | None] = mapped_column(Integer, index=True)
    index_category: Mapped[str | None] = mapped_column(String(50))  # scopus | wos | ieee | springer
    tier: Mapped[str | None] = mapped_column(String(10))  # Q1 | Q2 | Q3 | Q4
    citations: Mapped[int] = mapped_column(Integer, default=0)
    doi: Mapped[str | None] = mapped_column(String(255))


class PublicationAuthor(TimestampMixin, Base):
    __tablename__ = "publication_authors"

    id: Mapped[int] = mapped_column(primary_key=True)
    publication_id: Mapped[int] = mapped_column(ForeignKey("publications.id"), index=True)
    faculty_id: Mapped[int] = mapped_column(ForeignKey("faculty.id"), index=True)
