from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import RandomForestRegressor

def train_model(X, y):
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model

def normalize_scores(raw_scores):
    scaler = MinMaxScaler(feature_range=(0, 1000))
    return scaler.fit_transform(raw_scores.reshape(-1, 1)).flatten()
