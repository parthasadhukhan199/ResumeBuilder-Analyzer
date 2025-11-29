<<<<<<< HEAD

import os
import re
import nltk
import joblib
import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize


# Proper NLTK Setup (Fixes punkt_tab & AppData issues)

nltk_data_dir = os.path.join(os.getcwd(), "nltk_data")
os.makedirs(nltk_data_dir, exist_ok=True)

# Force NLTK to use only your local project folder
nltk.data.path.clear()
nltk.data.path.append(nltk_data_dir)

# Download required resources safely
for resource in ["punkt", "punkt_tab", "stopwords", "averaged_perceptron_tagger"]:
    try:
        nltk.data.find(resource)
    except LookupError:
        nltk.download(resource, download_dir=nltk_data_dir)

print(f" NLTK resources loaded from: {nltk_data_dir}")


#   Predefined Keywords

SKILL_KEYWORDS = {
    "Python", "Java", "JavaScript", "C++", "C", "React", "Node.js", "SQL",
    "MongoDB", "HTML", "CSS", "AWS", "Docker", "Kubernetes", "Machine Learning",
    "Data Analysis", "Django", "Flask", "Git", "Communication", "Leadership",
    "Problem Solving", "Project Management"
}

ORG_KEYWORDS = [
    "Inc", "LLC", "Technologies", "Labs", "Solutions",
    "Corporation", "Company", "Startup"
]


#  Extraction Functions

def extract_emails(text):
    pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
    matches = re.findall(pattern, text, flags=re.IGNORECASE)
    cleaned_emails = list(set(email.lower().strip() for email in matches))

    return cleaned_emails

def extract_phone_numbers(text):
    pattern = r'\+?\d[\d\s\-()]{8,}\d'  
    matches = re.findall(pattern, text)
    return sorted(set(re.sub(r'[^\d+]', '', m) for m in matches if 10 <= len(re.sub(r'\D', '', m)) <= 13))


def extract_skills(text):
    words = set(word_tokenize(text))
    return [
        skill for skill in SKILL_KEYWORDS
        if skill.lower() in [w.lower() for w in words]
    ]

def extract_experience(text):
    """Identify sentences that look like organization or work experiences."""
    sentences = sent_tokenize(text)
    orgs = [sent.strip() for sent in sentences if any(k in sent for k in ORG_KEYWORDS)]
    return orgs[:5]

#   Sentiment Analysis with Pretrained Model
MODEL_PATH = "./my_model/resume_sentiment_model.pkl"
sentiment_model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None

def get_sentiment(text):
    """Predict hiring sentiment using your trained resume model (.pkl)."""
    try:
        if sentiment_model is None:
            return {"interpretation": "Unknown", "polarity": 0.0, "subjectivity": 0.0}

        df = pd.Series([text])
        pred = sentiment_model.predict(df)[0]
        prob = sentiment_model.predict_proba(df)[0][pred]

        polarity = round(prob if pred == 1 else -prob, 2)
        subjectivity = round(abs(polarity) + 0.4, 2)
        interpretation = "Positive (Hire)" if pred == 1 else "Negative (Reject)"

        return {
            "interpretation": interpretation,
            "polarity": polarity,
            "subjectivity": subjectivity
        }

    except Exception as e:
        print(" Sentiment prediction error:", e)
        return {"interpretation": "Neutral", "polarity": 0.0, "subjectivity": 0.0}


#   Key Phrase Extraction

def extract_key_phrases(text):
    stop_words = set(stopwords.words("english"))
    words = word_tokenize(text)
    phrases = [w for w in words if w.isalpha() and w.lower() not in stop_words]
    freq = nltk.FreqDist(phrases)
    return [word for word, _ in freq.most_common(10)]


#   Full CV Analysis Pipeline

def analyze_resume(text):
    """Run full CV analysis pipeline."""
    return {
        "contact_info": {
            "emails": extract_emails(text),
            "phones": extract_phone_numbers(text)
        },
        "skills": extract_skills(text),
        "experience": extract_experience(text),
        "sentiment": get_sentiment(text),
        "key_phrases": extract_key_phrases(text),
        "word_count": len(word_tokenize(text)),
        "character_count": len(text.replace(" ", "")),
        "all_text": text
    }
=======

import os
import re
import nltk
import joblib
import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize


# Proper NLTK Setup (Fixes punkt_tab & AppData issues)

nltk_data_dir = os.path.join(os.getcwd(), "nltk_data")
os.makedirs(nltk_data_dir, exist_ok=True)

# Force NLTK to use only your local project folder
nltk.data.path.clear()
nltk.data.path.append(nltk_data_dir)

# Download required resources safely
for resource in ["punkt", "punkt_tab", "stopwords", "averaged_perceptron_tagger"]:
    try:
        nltk.data.find(resource)
    except LookupError:
        nltk.download(resource, download_dir=nltk_data_dir)

print(f" NLTK resources loaded from: {nltk_data_dir}")


#   Predefined Keywords

SKILL_KEYWORDS = {
    "Python", "Java", "JavaScript", "C++", "C", "React", "Node.js", "SQL",
    "MongoDB", "HTML", "CSS", "AWS", "Docker", "Kubernetes", "Machine Learning",
    "Data Analysis", "Django", "Flask", "Git", "Communication", "Leadership",
    "Problem Solving", "Project Management"
}

ORG_KEYWORDS = [
    "Inc", "LLC", "Technologies", "Labs", "Solutions",
    "Corporation", "Company", "Startup"
]


#  Extraction Functions

def extract_emails(text):
    pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
    matches = re.findall(pattern, text, flags=re.IGNORECASE)
    cleaned_emails = list(set(email.lower().strip() for email in matches))

    return cleaned_emails

def extract_phone_numbers(text):
    pattern = r'\+?\d[\d\s\-()]{8,}\d'  
    matches = re.findall(pattern, text)
    return sorted(set(re.sub(r'[^\d+]', '', m) for m in matches if 10 <= len(re.sub(r'\D', '', m)) <= 13))


def extract_skills(text):
    words = set(word_tokenize(text))
    return [
        skill for skill in SKILL_KEYWORDS
        if skill.lower() in [w.lower() for w in words]
    ]

def extract_experience(text):
    """Identify sentences that look like organization or work experiences."""
    sentences = sent_tokenize(text)
    orgs = [sent.strip() for sent in sentences if any(k in sent for k in ORG_KEYWORDS)]
    return orgs[:5]

#   Sentiment Analysis with Pretrained Model
MODEL_PATH = "./my_model/resume_sentiment_model.pkl"
sentiment_model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None

def get_sentiment(text):
    """Predict hiring sentiment using your trained resume model (.pkl)."""
    try:
        if sentiment_model is None:
            return {"interpretation": "Unknown", "polarity": 0.0, "subjectivity": 0.0}

        df = pd.Series([text])
        pred = sentiment_model.predict(df)[0]
        prob = sentiment_model.predict_proba(df)[0][pred]

        polarity = round(prob if pred == 1 else -prob, 2)
        subjectivity = round(abs(polarity) + 0.4, 2)
        interpretation = "Positive (Hire)" if pred == 1 else "Negative (Reject)"

        return {
            "interpretation": interpretation,
            "polarity": polarity,
            "subjectivity": subjectivity
        }

    except Exception as e:
        print(" Sentiment prediction error:", e)
        return {"interpretation": "Neutral", "polarity": 0.0, "subjectivity": 0.0}


#   Key Phrase Extraction

def extract_key_phrases(text):
    stop_words = set(stopwords.words("english"))
    words = word_tokenize(text)
    phrases = [w for w in words if w.isalpha() and w.lower() not in stop_words]
    freq = nltk.FreqDist(phrases)
    return [word for word, _ in freq.most_common(10)]


#   Full CV Analysis Pipeline

def analyze_resume(text):
    """Run full CV analysis pipeline."""
    return {
        "contact_info": {
            "emails": extract_emails(text),
            "phones": extract_phone_numbers(text)
        },
        "skills": extract_skills(text),
        "experience": extract_experience(text),
        "sentiment": get_sentiment(text),
        "key_phrases": extract_key_phrases(text),
        "word_count": len(word_tokenize(text)),
        "character_count": len(text.replace(" ", "")),
        "all_text": text
    }
>>>>>>> e12a0af6194ec1fccde5c37358c4afa1d2864623
