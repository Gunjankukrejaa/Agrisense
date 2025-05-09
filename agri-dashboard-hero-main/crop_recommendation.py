import numpy as np
import requests
import pickle
import logging
import os

# Configure logging
logger = logging.getLogger(__name__)

# Load model with validation
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'RandomForest.pkl')

try:
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
        
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
    logger.info("Model loaded successfully")
    
except Exception as e:
    logger.error(f"Model loading failed: {str(e)}")
    raise

def get_weather(city):
    """Fetch weather data with proper validation"""
    try:
        api_key = "1d28a84f6820dceb689afbca522a42b0"  # Replace with actual key
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
        
        logger.info(f"Fetching weather for {city}")
        response = requests.get(url, timeout=15)
        response.raise_for_status()
        
        data = response.json()
        logger.debug(f"Weather API response: {data}")
        
        return (
            round(data['main']['temp'] - 273.15, 2),  # Temperature in °C
            data['main']['humidity']                   # Humidity %
        )
        
    except Exception as e:
        logger.error(f"Weather API failed for {city}: {str(e)}")
        return None

def recommend_crop(data):
    """Core recommendation logic with full validation"""
    logger.info("Starting recommendation process")
    
    try:
        
        # Get weather data
        weather = get_weather(data['city'])
        if not weather:
            raise ValueError("Could not fetch weather data")
            
        temp, humidity = weather
        
        # Prepare model input
        input_data = np.array([[
            data['nitrogen'],
            data['phosphorus'],
            data['potassium'],
            temp,
            humidity,
            data['ph'],
            data['rainfall']
        ]])
        
        # Get prediction
        prediction = model.predict(input_data)
        logger.info(f"Prediction successful: {prediction[0]}")
        
        return {
            "crop": prediction[0],
            "weather": {
                "temperature": temp,
                "humidity": humidity,
                "location": data['city']
            }
        }, 200
        
    except ValueError as e:
        logger.warning(f"Validation error: {str(e)}")
        return {"error": str(e)}, 400
        
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}", exc_info=True)
        return {"error": "Prediction service unavailable"}, 500