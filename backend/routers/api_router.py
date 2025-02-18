from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.database import get_db
from controllers.item_controller import get_items

router = APIRouter()

@router.get("/items")
def read_items(db: Session = Depends(get_db)):
    items = get_items(db)
    return items
