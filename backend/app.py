<<<<<<< HEAD





from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
import random
from werkzeug.utils import secure_filename




app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS










from nlp_model import analyze_resume
from functions import extract_text_from_pdf

def generate_analysis(filepath):
    text = extract_text_from_pdf(filepath)
    return analyze_resume(text)

       
        
    
















@app.route('/api/analyze', methods=['POST'])
def analyze_cv():
    """Analyze uploaded CV file"""
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({
                'error': f'File type not supported. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'
            }), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Get file info
        file_size = os.path.getsize(filepath)
        file_extension = filename.rsplit('.', 1)[1].lower()
        
        # Generate dummy analysis (simulating real NLP processing)
        analysis_results = generate_analysis(filepath)
        
        # Clean up uploaded file
        os.remove(filepath)
        
        return jsonify({
            'success': True,
            'message': 'CV analyzed successfully',
            'file_info': {
                'filename': filename,
                'size_bytes': file_size,
                'format': file_extension,
                'processed_at': time.strftime('%Y-%m-%d %H:%M:%S')
            },
            'analysis': analysis_results,
            'processing_time_seconds': round(random.uniform(1.5, 3.0), 2)
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': f'Analysis failed: {str(e)}',
            'success': False
        }), 500


@app.errorhandler(413)
def too_large(e):
    return jsonify({
        'error': 'File too large. Maximum size is 16MB.',
        'success': False
    }), 413

@app.errorhandler(404)
def not_found(e):
    return jsonify({
        'error': 'Endpoint not found',
        'success': False,
        'available_endpoints': [
            'POST /api/analyze',
        ]
    }), 404

@app.errorhandler(500)
def internal_error(e):
    return jsonify({
        'error': 'Internal server error',
        'success': False
    }), 500

if __name__ == '__main__':
    print("Starting CV Analysis Backend...")
    print(f"Upload folder: {UPLOAD_FOLDER}")
    print(f"Supported file types: {', '.join(ALLOWED_EXTENSIONS)}")
    print("Server running on http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)

=======





from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
import random
from werkzeug.utils import secure_filename




app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS










from nlp_model import analyze_resume
from functions import extract_text_from_pdf

def generate_analysis(filepath):
    text = extract_text_from_pdf(filepath)
    return analyze_resume(text)

       
        
    
















@app.route('/api/analyze', methods=['POST'])
def analyze_cv():
    """Analyze uploaded CV file"""
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({
                'error': f'File type not supported. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'
            }), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Get file info
        file_size = os.path.getsize(filepath)
        file_extension = filename.rsplit('.', 1)[1].lower()
        
        # Generate dummy analysis (simulating real NLP processing)
        analysis_results = generate_analysis(filepath)
        
        # Clean up uploaded file
        os.remove(filepath)
        
        return jsonify({
            'success': True,
            'message': 'CV analyzed successfully',
            'file_info': {
                'filename': filename,
                'size_bytes': file_size,
                'format': file_extension,
                'processed_at': time.strftime('%Y-%m-%d %H:%M:%S')
            },
            'analysis': analysis_results,
            'processing_time_seconds': round(random.uniform(1.5, 3.0), 2)
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': f'Analysis failed: {str(e)}',
            'success': False
        }), 500


@app.errorhandler(413)
def too_large(e):
    return jsonify({
        'error': 'File too large. Maximum size is 16MB.',
        'success': False
    }), 413

@app.errorhandler(404)
def not_found(e):
    return jsonify({
        'error': 'Endpoint not found',
        'success': False,
        'available_endpoints': [
            'POST /api/analyze',
        ]
    }), 404

@app.errorhandler(500)
def internal_error(e):
    return jsonify({
        'error': 'Internal server error',
        'success': False
    }), 500

if __name__ == '__main__':
    print("Starting CV Analysis Backend...")
    print(f"Upload folder: {UPLOAD_FOLDER}")
    print(f"Supported file types: {', '.join(ALLOWED_EXTENSIONS)}")
    print("Server running on http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)

>>>>>>> e12a0af6194ec1fccde5c37358c4afa1d2864623
