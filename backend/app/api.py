from fastapi import FastAPI

from app.database import LarkModel, database, larks

app = FastAPI()

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/larks")
async def read_root():
    query = larks.select()
    rows = await database.fetch_all(query=query)
    return rows

@app.post("/larks")
async def read_root(data: LarkModel):
    query = larks.insert()
    values = data.dict()
    await database.execute(query=query, values=values)
    return 200