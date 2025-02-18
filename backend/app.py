from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.api_router import router
from backend.models.database import engine, Base


# DB 테이블 생성
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS 설정 (모든 요청 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API 라우트 등록
app.include_router(router)
