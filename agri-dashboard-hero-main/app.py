
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image
import io
import logging
from utils.model import ResNet9
import google.generativeai as genai
from crop_recommendation import recommend_crop  # New import

app = Flask(__name__)
CORS(app)

#CORS(app)
logging.basicConfig(level=logging.INFO)

# Initialize Gemini API (keep existing configuration)

# Keep all existing disease classes and model loading code unchanged
disease_classes = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust',
    'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight',
    'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

disease_model_path = 'plant_disease_model.pth'
disease_model = ResNet9(3, len(disease_classes))
disease_model.load_state_dict(torch.load(disease_model_path, map_location=torch.device('cpu')))
disease_model.eval()

class CropRecommendation:
    n: int
    p: int
    k: int
    ph: int
    rf: int
    city:str

# Keep existing transform_image and format_text functions unchanged
def transform_image(image_bytes):
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    return torch.unsqueeze(transform(image), 0)

def format_text(text):
    text = text.replace("*", "").strip()
    points = [point.strip() for point in text.split("\n") if point.strip()]
    return points

# Modified prediction endpoint (only changes to the Gemini prompt section)
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Keep existing file handling and prediction logic unchanged
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            return jsonify({'error': 'Invalid file format'}), 400

        img_bytes = file.read()
        img_tensor = transform_image(img_bytes)

        with torch.no_grad():
            outputs = disease_model(img_tensor)
            _, preds = torch.max(outputs, dim=1)
            prediction = disease_classes[preds[0].item()]

        if 'healthy' in prediction.lower():
            return jsonify({'mainDisease': {'name': prediction, 'confidence': 0.95}})

        # Modified section: Separate prompts for symptoms and treatments
        model = genai.GenerativeModel("gemini-1.5-flash-latest")
        
        # Get symptoms
        symptoms_response = model.generate_content(
            f"List only the specific symptoms of {prediction} in plain text bullet points. "
            "Focus on visual identifiers and plant changes. Avoid markdown formatting."
        )
        symptoms = format_text(symptoms_response.text) if symptoms_response else []
        
        # Get treatments
        treatment_response = model.generate_content(
            f"List only practical treatments for {prediction} in plain text bullet points. "
            "Include both chemical and cultural methods. Avoid markdown formatting."
        )
        treatments = format_text(treatment_response.text) if treatment_response else []

        return jsonify({
            'mainDisease': {
                'name': prediction,
                'confidence': 0.95,
                'symptoms': symptoms,
                'treatment': treatments
            }
        })

    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        return jsonify({'error': f'Failed to process image: {str(e)}'}), 500

# New route for crop recommendation
# @app.route('/api/predict-crop', methods=['POST'])
# def crop_recommendation():
#     """Handle crop recommendation requests"""
#     data = request.get_json()
#     result, status_code = recommend_crop(data)  # Use the imported function
#     return jsonify(result), status_code
# app.py - CORRECTED ROUTE DEFINITION

@app.route('/api/predict-crop', methods=['POST'])
def predict_crop():
    """Main prediction endpoint"""    
    try:

        # Validate request format
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        # Process request
        result, status_code = recommend_crop(request.get_json())

        return jsonify(result), status_code

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

# Global error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({'error': 'Unexpected server error'}), 500



# Keep the rest of the code unchanged
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
