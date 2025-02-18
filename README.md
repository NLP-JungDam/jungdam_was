# jungdam_was

필수 install
pip install fastapi uvicorn sqlalchemy psycopg2 python-dotenv pydantic torch transformers accelerate

venv 생성
python -m venv venv

venv 실행
venv\Scripts\activate

포트 실행
`. 백엔드
cd backend
uvicorn main:app --host 0.0.0.0 --port=8000 --reload

2. 모델
cd model_server
uvicorn model_main:app --host 0.0.0.0 --port=8001 --reload

DB 
17.3 ver. -> postgre
postsql.org