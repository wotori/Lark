import sqlalchemy
from databases import Database
from pydantic import BaseModel

metadata = sqlalchemy.MetaData()
database = Database("postgresql+psycopg2://postgres:docker@127.0.0.1:5432/lark")

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
