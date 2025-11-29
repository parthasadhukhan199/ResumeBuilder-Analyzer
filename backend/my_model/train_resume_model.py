<<<<<<< HEAD
import pandas as pd
import re
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression


MODEL_TYPE = "nb"   


# Load Data

data = pd.read_csv("./AI_Resume_Screening.csv")

# Combine text features
data["combined_text"] = (
    data["Skills"].fillna("") + " " +
    data["Education"].fillna("") + " " +
    data["Certifications"].fillna("") + " " +
    data["Job Role"].fillna("")
)

# Clean text
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    return text

data["combined_text"] = data["combined_text"].apply(clean_text)

# Map labels
y = data["Recruiter Decision"].map({"Hire": 1, "Reject": 0})
X = data["combined_text"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)


# Build Model Based on Choice

if MODEL_TYPE == "nb":
    print("\n🚀 Training Naive Bayes Model...")
    model = Pipeline([
        ("tfidf", TfidfVectorizer(
            stop_words="english",
            ngram_range=(1, 2),
            max_df=0.85,
            min_df=2
        )),
        ("clf", MultinomialNB())
    ])

    params = {
        "clf__alpha": [0.1, 0.5, 1.0]
    }

elif MODEL_TYPE == "logistic":
    print("\n🚀 Training Logistic Regression Model...")
    model = Pipeline([
        ("tfidf", TfidfVectorizer(stop_words="english")),
        ("clf", LogisticRegression(max_iter=300, class_weight="balanced"))
    ])

    params = {
        "tfidf__ngram_range": [(1, 1), (1, 2)],
        "tfidf__max_df": [0.7, 0.85, 0.95],
        "tfidf__min_df": [2, 3],
        "clf__C": [0.5, 1, 2]
    }

else:
    raise ValueError("Invalid MODEL_TYPE! Use 'nb' or 'logistic'.")


# Train using Grid Search
grid = GridSearchCV(model, params, cv=3, n_jobs=-1, verbose=2)
grid.fit(X_train, y_train)

# print("\n✅ Best Parameters:", grid.best_params_)
# print("✅ Best Cross-Validation Accuracy:", grid.best_score_)

# Evaluate
model = grid.best_estimator_
y_pred = model.predict(X_test)

#---------------------------------------
# #evaluate
# model.fit(X_train, y_train)
# y_pred = model.predict(X_test)
#---------------------------------------

print("\n📊 Test Accuracy:", accuracy_score(y_test, y_pred))
# print("\n🔍 Classification Report:\n", classification_report(y_test, y_pred,zero_division=0))




# Save Model

filename = f"resume_sentiment_model.pkl"
joblib.dump(model, filename)
print(f"\n💾 Model saved successfully as '{filename}'")

=======
import pandas as pd
import re
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression


MODEL_TYPE = "nb"   


# Load Data

data = pd.read_csv("./AI_Resume_Screening.csv")

# Combine text features
data["combined_text"] = (
    data["Skills"].fillna("") + " " +
    data["Education"].fillna("") + " " +
    data["Certifications"].fillna("") + " " +
    data["Job Role"].fillna("")
)

# Clean text
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    return text

data["combined_text"] = data["combined_text"].apply(clean_text)

# Map labels
y = data["Recruiter Decision"].map({"Hire": 1, "Reject": 0})
X = data["combined_text"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)


# Build Model Based on Choice

if MODEL_TYPE == "nb":
    print("\n Training Naive Bayes Model...")
    model = Pipeline([
        ("tfidf", TfidfVectorizer(
            stop_words="english",
            ngram_range=(1, 2),
            max_df=0.85,
            min_df=2
        )),
        ("clf", MultinomialNB())
    ])

    params = {
        "clf__alpha": [0.1, 0.5, 1.0]
    }

elif MODEL_TYPE == "logistic":
    print("\n Training Logistic Regression Model...")
    model = Pipeline([
        ("tfidf", TfidfVectorizer(stop_words="english")),
        ("clf", LogisticRegression(max_iter=300, class_weight="balanced"))
    ])

    params = {
        "tfidf__ngram_range": [(1, 1), (1, 2)],
        "tfidf__max_df": [0.7, 0.85, 0.95],
        "tfidf__min_df": [2, 3],
        "clf__C": [0.5, 1, 2]
    }

else:
    raise ValueError("Invalid MODEL_TYPE! Use 'nb' or 'logistic'.")


# Train using Grid Search
grid = GridSearchCV(model, params, cv=3, n_jobs=-1, verbose=2)
grid.fit(X_train, y_train)

# print("\n Best Parameters:", grid.best_params_)
# print(" Best Cross-Validation Accuracy:", grid.best_score_)

# Evaluate
model = grid.best_estimator_
y_pred = model.predict(X_test)

#---------------------------------------
# #evaluate
# model.fit(X_train, y_train)
# y_pred = model.predict(X_test)
#---------------------------------------

print("\n Test Accuracy:", accuracy_score(y_test, y_pred))
# print("\n Classification Report:\n", classification_report(y_test, y_pred,zero_division=0))




# Save Model

filename = f"resume_sentiment_model.pkl"
joblib.dump(model, filename)
print(f"\n Model saved successfully as '{filename}'")

>>>>>>> e12a0af6194ec1fccde5c37358c4afa1d2864623
