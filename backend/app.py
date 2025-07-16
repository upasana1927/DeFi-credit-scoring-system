from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
from pipeline.scoring import run_pipeline

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "🚀 Flask server is running!"

@app.route("/score", methods=["POST"])
def score_wallets():
    file = request.files['file']
    filepath = os.path.join("temp", file.filename)
    file.save(filepath)

    output_csv = "temp/wallet_scores.csv"
    run_pipeline(filepath, output_csv)

    df = pd.read_csv(output_csv)
    return df.to_json(orient="records")

if __name__ == "__main__":
    os.makedirs("temp", exist_ok=True)
    app.run(debug=True)
