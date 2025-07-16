from pipeline.data_loader import load_data
from pipeline.feature_engineering import extract_features
from pipeline.model import train_model, normalize_scores
import pandas as pd
import numpy as np

def run_pipeline(json_path, output_path):
    df = load_data(json_path)
    features_df = extract_features(df)

    # Define target: simulate credit score based on expert rules
    features_df['target'] = (
        features_df['repays'] * 2 +
        features_df['deposits'] * 1.5 -
        features_df['liquidations'] * 3 +
        features_df['active_days'] * 0.5
    )

    X = features_df[['num_transactions', 'deposits', 'borrows', 'repays', 'redeems', 'liquidations', 'active_days']]
    y = features_df['target']

    model = train_model(X, y)
    raw_scores = model.predict(X)
    final_scores = normalize_scores(np.array(raw_scores))

    result = pd.DataFrame({'user': features_df['user'], 'credit_score': final_scores})
    result.to_csv(output_path, index=False)
    print(f"Scores saved to {output_path}")
