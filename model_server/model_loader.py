from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

MODEL_NAME = "siwon23/llama-2-kdt-finetuned-merged"
device = "cuda" if torch.cuda.is_available() else "cpu"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME, torch_dtype=torch.float16, device_map="auto"
)

def generate_text(prompt: str, max_length: int = 100):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    output = model.generate(**inputs, max_length=max_length)
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return {"prompt": prompt, "generated_text": generated_text}
