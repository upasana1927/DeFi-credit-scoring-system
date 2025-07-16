import json
import pandas as pd

def load_data(file_path):
    with open(file_path) as f:
        raw_data = json.load(f)

    df = pd.DataFrame(raw_data)

    # Rename userWallet → user
    df = df.rename(columns={"userWallet": "user"})

    print("Sample record:", df.iloc[0].to_dict())  # optional debug
    return df
