import sqlalchemy


metadata = sqlalchemy.MetaData()

notes = sqlalchemy.Table(
    "larks",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("author", sqlalchemy.String(length=100)),
    sqlalchemy.Column("text", sqlalchemy.String(length=100)),
)