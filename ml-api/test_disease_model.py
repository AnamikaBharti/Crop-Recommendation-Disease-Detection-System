import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import json
import os

# ==========================================
# 1. SETUP & LOAD (Using the Version Fix)
# ==========================================
print("Loading model and config...")

# Load Class Names
with open('class_names.json', 'r') as f:
    class_names = json.load(f)
num_classes = len(class_names)

# Re-build the architecture (Matches your app.py fix)
IMG_SIZE = 224
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights='imagenet'
)
base_model.trainable = False

model = models.Sequential([
    layers.Rescaling(1./127.5, offset=-1, input_shape=(IMG_SIZE, IMG_SIZE, 3)),
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dropout(0.2),
    layers.Dense(num_classes, activation='softmax')
])

# Load Weights
model.load_weights('plant_disease_model.h5')
print("✅ Model loaded successfully.")

# ==========================================
# 2. PREDICTION FUNCTION
# ==========================================
def predict_and_plot(image_path):
    if not os.path.exists(image_path):
        print(f"❌ Error: Image not found at {image_path}")
        return

    # Load and Preprocess Image
    img = Image.open(image_path)
    if img.mode != "RGB":
        img = img.convert("RGB")
    
    img_resized = img.resize((224, 224))
    img_array = np.array(img_resized).astype('float32')
    img_array = np.expand_dims(img_array, axis=0)

    # Predict
    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    
    # Get Top 5 Predictions
    top_k_values, top_k_indices = tf.math.top_k(predictions[0], k=5)
    top_k_values = top_k_values.numpy()
    top_k_indices = top_k_indices.numpy()
    
    top_classes = [class_names[i] for i in top_k_indices]
    
    # ==========================================
    # 3. VISUALIZE (Bar Chart)
    # ==========================================
    plt.figure(figsize=(12, 6))

    # Subplot 1: The Image
    plt.subplot(1, 2, 1)
    plt.imshow(img)
    plt.title("Input Image")
    plt.axis('off')

    # Subplot 2: The Bar Chart
    plt.subplot(1, 2, 2)
    bars = plt.barh(top_classes, top_k_values * 100, color='mediumseagreen')
    plt.xlabel('Confidence (%)')
    plt.title('AI Confidence Scores')
    plt.gca().invert_yaxis() # Put the highest score at the top
    
    # Add labels to bars
    for bar in bars:
        width = bar.get_width()
        plt.text(width + 1, bar.get_y() + bar.get_height()/2, 
                 f'{width:.1f}%', 
                 va='center', fontweight='bold')

    plt.tight_layout()
    plt.show()

# ==========================================
# 4. RUN TEST
# ==========================================
# Change this to your image name!
IMAGE_TO_TEST = "test_leaf.jpg" 

predict_and_plot(IMAGE_TO_TEST)