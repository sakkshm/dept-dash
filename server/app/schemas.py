from datetime import date
from typing import Any

from pydantic import BaseModel, ConfigDict


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class UserRead(ORMModel):
    id: int
    email: str
    name: str
    role: str


class StudentRead(ORMModel):
    id: int
    roll_no: str
    name: str
    batch: str
    program: str
    custom_fields: dict[str, Any]


class FacultyRead(ORMModel):
    id: int
    name: str
    designation: str | None
    email: str | None


class CourseRead(ORMModel):
    id: int
    code: str
    title: str
    credits: float
    semester: str


class PublicationRead(ORMModel):
    id: int
    title: str
    venue: str | None
    year: int | None
    index_category: str | None
    tier: str | None
    citations: int


class ProjectRead(ORMModel):
    id: int
    title: str
    kind: str | None
    status: str | None


class Health(BaseModel):
    status: str
    app: str
