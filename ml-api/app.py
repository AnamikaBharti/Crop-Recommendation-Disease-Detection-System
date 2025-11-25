from flask import Flask, request, jsonify
import pickle
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from PIL import Image
import io
import json

app = Flask(__name__)

# ==========================================
# 1. LOAD CROP MODEL
# ==========================================
print("Loading Crop Recommendation model...")
with open('crop_model.pkl', 'rb') as model_file:
    crop_model = pickle.load(model_file)


# ==========================================
# 2. BUILD & LOAD DISEASE MODEL ( The Fix 🛠️ )
# ==========================================
print("Loading Disease Detection model...")

# A. Load Class Names FIRST (We need the length)
with open('class_names.json', 'r') as f:
    disease_class_names = json.load(f)
num_classes = len(disease_class_names)

# B. Re-build the exact same model architecture locally
# This prevents the "Version Conflict" crash
IMG_SIZE = 224

base_model = tf.keras.applications.MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights='imagenet'
)
base_model.trainable = False

disease_model = models.Sequential([
    layers.Rescaling(1./127.5, offset=-1, input_shape=(IMG_SIZE, IMG_SIZE, 3)),
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dropout(0.2),
    layers.Dense(num_classes, activation='softmax')
])

# C. Load the trained "brain" (weights) into this structure
# Note: We use .load_weights instead of .load_model
disease_model.load_weights('plant_disease_model.h5')

print("All models loaded successfully.")


# ==========================================
# HELPER: Image Preprocessing
# ==========================================
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes))
    
    if img.mode != "RGB":
        img = img.convert("RGB")
    
    img = img.resize((224, 224))
    img_array = np.array(img).astype('float32') 
    # Note: We removed the / 255.0 here because the 
    # layers.Rescaling inside the model handles it now!
    
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


# ==========================================
# ROUTE 1: Crop Recommendation
# ==========================================
@app.route('/predict', methods=['POST'])
def predict_crop():
    data = request.get_json()
    
    # 1. Extract features
    features = [
        data['N'], data['P'], data['K'], 
        data['temperature'], data['humidity'], 
        data['ph'], data['rainfall']
    ]
    
    # 2. Get Probabilities instead of single prediction
    # predict_proba returns an array like [0.1, 0.0, 0.8, ...] for all classes
    probabilities = crop_model.predict_proba([np.array(features)])[0]
    
    # 3. Get the class names (e.g., 'rice', 'maize') that correspond to probabilities
    # The model stores these automatically
    class_names = crop_model.classes_
    
    # 4. Create a list of (Crop, Score) tuples
    # e.g., [('rice', 0.05), ('maize', 0.90), ...]
    crop_scores = list(zip(class_names, probabilities))
    
    # 5. Sort them by Score (Highest first)
    sorted_crops = sorted(crop_scores, key=lambda x: x[1], reverse=True)
    
    # 6. Take Top 3
    top_3 = sorted_crops[:3]
    
    # 7. Format for JSON response
    result = []
    for crop, score in top_3:
        result.append({
            "crop": crop,
            "confidence": f"{score * 100:.2f}%" # Convert 0.95 to "95.00%"
        })
    
    return jsonify({'top_crops': result})

# ==========================================
# ROUTE 2: Disease Detection
# ==========================================
@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
        
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        processed_img = preprocess_image(file.read())
        predictions = disease_model.predict(processed_img)
        
        predicted_index = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]))
        result_class = disease_class_names[predicted_index]
        
        return jsonify({
            'disease': result_class,
            'confidence': f"{confidence * 100:.2f}%"
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)