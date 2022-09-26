from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Paper(BaseModel):
    id: int
    name: str
    author: str
    link: str

class Problem(BaseModel):
    id: int
    name: str
    # also known as
    altnames: list[str] = []
    # the papers it was introduced at
    references: list[str] = []
    # (complexity based on the formula, name of algorithm,
    # reference to paper, name of author to paper)
    algorithms: list[(str, str, str, str)] = []
    # categories
    tags: list[str] = []

class Reductions(BaseModel):
    input: str
    output: str
    references: list[Paper] = []
    formulas: list[(str, str)] = []
    verified: bool
    link: str 

@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results

@app.get("/")
async def root():
    return {"message": "Hello World"}
