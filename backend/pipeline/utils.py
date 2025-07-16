import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

def convert_to_date(timestamp_str):
    """
    Extracts date (YYYY-MM-DD) from a timestamp string.
    Example input: "2023-04-12T09:34:21Z"
    """
    try:
        return timestamp_str.split("T")[0]
    except Exception:
        return None

def safe_divide(numerator, denominator):
    """
    Prevents division by zero.
    Returns 0 if denominator is zero.
    """
    if denominator == 0:
        return 0
    return numerator / denominator

def normalize_column(df, column_name, new_min=0, new_max=1):
    """
    Normalize a single column to a specified range.
    """
    scaler = MinMaxScaler(feature_range=(new_min, new_max))
    reshaped = df[[column_name]].values.reshape(-1, 1)
    df[column_name + "_norm"] = scaler.fit_transform(reshaped)
    return df

def score_to_bucket(score):
    """
    Bucketize score into ranges like 0-100, 100-200, ..., 900-1000
    """
    bucket = int(score // 100) * 100
    return f"{bucket}-{bucket+100}"
