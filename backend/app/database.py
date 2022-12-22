import os

import sqlalchemy
from databases import Database
from pydantic import BaseModel

DATABASE_URL = os.environ("DATABASE_URL")
metadata = sqlalchemy.MetaData()
database = DATABASE_URL

class LarkModel(BaseModel):
    author: str
    text: str
    date: str

larks = sqlalchemy.Table(
    "larks",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("author", sqlalchemy.String()),
    sqlalchemy.Column("text", sqlalchemy.String()),
    sqlalchemy.Column("date", sqlalchemy.String()),
)
