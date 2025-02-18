from sqlalchemy.orm import Session
from models.item_model import Item

def get_items(db: Session):
    return db.query(Item).all()
