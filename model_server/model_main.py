import uvicorn
from fastapi import FastAPI
from model_loader import generate_text

app = FastAPI()

@app.post("/generate/")
def generate_text_api(prompt: str, max_length: int = 100):
    return generate_text(prompt, max_length)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)
