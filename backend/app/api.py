from fastapi import FastAPI

app = FastAPI()

@app.get("/larks")
def read_root():
    return {"Hello": "World"}

@app.post("/larks")
def read_root():
    return {"Hello": "World"}