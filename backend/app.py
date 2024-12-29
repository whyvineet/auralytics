from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from datetime import datetime
import jwt
import os

app = Flask(__name__)
CORS(app)

# Configure JWT
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')

# Mock database (replace with PostgreSQL in production)
users = {}
sessions = {}

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    if data['email'] in users:
        return jsonify({'error': 'User already exists'}), 400
    
    users[data['email']] = {
        'email': data['email'],
        'password': data['password'],  # Hash this in production
        'created_at': datetime.utcnow()
    }
    
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = users.get(data['email'])
    
    if not user or user['password'] != data['password']:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    token = jwt.encode(
        {'email': data['email']},
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )
    
    return jsonify({'token': token})

@app.route('/api/interview/analyze', methods=['POST'])
def analyze_interview():
    # Mock confidence analysis
    confidence_score = np.random.normal(75, 10)
    
    # Mock speech analysis
    speech_metrics = {
        'pace': np.random.normal(80, 5),
        'clarity': np.random.normal(85, 5),
        'filler_words': int(np.random.normal(5, 2))
    }
    
    # Generate feedback
    feedback = generate_feedback(confidence_score, speech_metrics)
    
    return jsonify({
        'confidence_score': confidence_score,
        'speech_metrics': speech_metrics,
        'feedback': feedback
    })

def generate_feedback(confidence_score, speech_metrics):
    feedback = []
    
    if confidence_score < 70:
        feedback.append("Try to maintain more consistent eye contact and posture.")
    elif confidence_score > 90:
        feedback.append("Excellent confidence level! Keep up the positive body language.")
    
    if speech_metrics['pace'] > 85:
        feedback.append("Consider speaking at a slightly slower pace.")
    elif speech_metrics['pace'] < 75:
        feedback.append("Try to speak a bit more quickly while maintaining clarity.")
    
    if speech_metrics['filler_words'] > 5:
        feedback.append("Watch out for filler words like 'um' and 'uh'.")
    
    return " ".join(feedback)

if __name__ == '__main__':
    app.run(debug=True)