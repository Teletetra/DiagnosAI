from flask import Flask, request, jsonify
import torch
import timm
from PIL import Image
import torchvision.transforms as transforms

app = Flask(__name__)

# Load the trained model
MODEL_PATH = "./AI/model/my_model.pth"
model = torch.load(MODEL_PATH, map_location=torch.device("cpu"))
model.eval()

# Preprocessing function
def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5], std=[0.5])
    ])
    return transform(image).unsqueeze(0)

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = Image.open(request.files["image"]).convert("RGB")
    image_tensor = preprocess_image(image)

    with torch.no_grad():
        output = model(image_tensor)
        predicted_class = torch.argmax(output, dim=1).item()

    return jsonify({"prediction": f"Disease detected: {predicted_class}"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
