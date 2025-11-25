import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 1. Load Data
print("Loading data...")
df = pd.read_csv('Crop_recommendation.csv')

# 2. Prepare Data
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']

# Split (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Train Model (We retrain quickly to get the test objects)
print("Training model for evaluation...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 4. Make Predictions
y_pred = model.predict(X_test)

# 5. Calculate Accuracy
acc = accuracy_score(y_test, y_pred)
print(f"\n✅ Model Accuracy: {acc * 100:.2f}%")
print("\n--- Classification Report ---")
print(classification_report(y_test, y_pred))

# ==========================================
# CHART 1: CONFUSION MATRIX
# ==========================================
# This shows where the model is confused (e.g., predicting Rice when it's actually Jute)
plt.figure(figsize=(12, 10))
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Greens', 
            xticklabels=model.classes_, yticklabels=model.classes_)
plt.title('Confusion Matrix (Darker Green = More Correct Predictions)')
plt.xlabel('Predicted Crop')
plt.ylabel('Actual Crop')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# ==========================================
# CHART 2: FEATURE IMPORTANCE
# ==========================================
# This shows which input variable matters the most
feature_importances = pd.DataFrame({
    'Feature': X.columns,
    'Importance': model.feature_importances_
}).sort_values(by='Importance', ascending=False)

plt.figure(figsize=(10, 6))
sns.barplot(x='Importance', y='Feature', data=feature_importances, palette='viridis')
plt.title('Which Factors Matter Most?')
plt.xlabel('Importance Score')
plt.ylabel('Features')
plt.show()