import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle

# 1. Load the dataset
df = pd.read_csv('Crop_recommendation.csv')

# 2. Separate features (X) and target (y)
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']

# 3. Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Initialize and train the Random Forest model
rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42)
rf_classifier.fit(X_train, y_train)

# 5. Evaluate the model
y_pred = rf_classifier.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, y_pred)}")

# 6. Save the trained model to a file
with open('crop_model.pkl', 'wb') as model_file:
    pickle.dump(rf_classifier, model_file)

print("Model saved as crop_model.pkl")