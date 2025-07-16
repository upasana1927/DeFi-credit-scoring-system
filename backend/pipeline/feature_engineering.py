import pandas as pd
from datetime import datetime
def extract_features(df):
    features = []

    grouped = df.groupby('user')
    for user, user_df in grouped:
        stats = {
            "user": user,
            "num_transactions": len(user_df),
            "deposits": sum(user_df['action'] == 'deposit'),
            "borrows": sum(user_df['action'] == 'borrow'),
            "repays": sum(user_df['action'] == 'repay'),
            "redeems": sum(user_df['action'] == 'redeemunderlying'),
            "liquidations": sum(user_df['action'] == 'liquidationcall'),
            "active_days": user_df['timestamp'].apply(lambda x: datetime.fromtimestamp(x).date()).nunique(),
        }
        features.append(stats)

    return pd.DataFrame(features)
