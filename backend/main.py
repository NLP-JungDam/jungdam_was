import uvicorn
from app import app  # FastAPI 객체 가져오기

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
