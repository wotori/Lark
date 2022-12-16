from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.database import LarkModel, database, larks

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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