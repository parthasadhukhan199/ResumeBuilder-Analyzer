<<<<<<< HEAD

# for pdf extraction from a location
import PyPDF2

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            
            for page in pdf_reader.pages:
                text += page.extract_text()
            
            return text.strip()
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
        return ""





=======

# for pdf extraction from a location
import PyPDF2

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            
            for page in pdf_reader.pages:
                text += page.extract_text()
            
            return text.strip()
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
        return ""





>>>>>>> e12a0af6194ec1fccde5c37358c4afa1d2864623
