# 💳 DeFi Credit Scoring System

A machine learning-powered system for assigning on-chain credit scores (0–1000) to Ethereum wallets based on their historical interaction with the Aave V2 protocol.

---

## 📌 Project Overview

This project uses historical transaction-level data from the Aave V2 protocol to predict the creditworthiness of DeFi wallet addresses. The goal is to assign a **risk-based credit score** (between 0 and 1000) to each wallet based on behavioral patterns such as deposits, borrows, repayments, redemptions, and liquidation activity.

---

## 🧠 Methodology

### ✅ Problem Statement

To develop a machine learning model that:
- Ingests a JSON file of raw wallet transactions
- Engineers meaningful features
- Normalizes data using appropriate scaling techniques
- Outputs a **credit score** for each wallet address

---

## 🔧 Tech Stack

| Component       | Technology         |
|----------------|--------------------|
| Frontend       | React.js           |
| Backend API    | Flask              |
| ML Model       | Python (pandas, scikit-learn) |
| Visualization  | Chart.js (React wrapper) |
| Deployment     | GitHub / Localhost |

---

## 🧱 Architecture Overview


         ┌────────────────────────┐
         │   User Uploads JSON    │
         │   via React Frontend   │
         └────────────┬───────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │ Flask Backend API      │
         │ - Parses JSON          │
         │ - Sends data to model  │
         └────────────┬───────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │  ML Pipeline (Python)  │
         │  - Feature Engineering │
         │  - Scaling             │
         │  - Score Prediction    │
         └────────────┬───────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │  Return Scores to FE   │
         │  + Render Charts       │
         └────────────────────────┘


---

## 🔍 Feature Engineering

The following features were engineered from each wallet's transaction history:

| Feature | Description |
|--------|-------------|
| `total_transactions` | Total number of Aave protocol interactions |
| `total_deposit` | Sum of all deposits |
| `total_borrow` | Sum of all borrows |
| `borrow_to_deposit_ratio` | Risk exposure metric |
| `num_liquidations` | Count of times the wallet was liquidated |
| `repay_frequency` | Count of repayment events |
| `redeem_frequency` | Frequency of redeeming deposited assets |
| `time_span_days` | Active duration between first and last transaction |
| `transaction_type_diversity` | Variety in interaction types (deposit, borrow, etc.) |

---

## ⚖️ Data Preprocessing and Scaling

We applied the following steps before training:

- **Missing Value Handling:** Replaced NAs with zeros or averages
- **Normalization:** Used `MinMaxScaler` to scale numerical features to the [0, 1] range
- **Label Generation:** Score label generated using a custom rule-based mapping (for now) or regression model (optionally)

> Future versions may apply XGBoost or LightGBM for enhanced interpretability and performance.

---

## 📈 Credit Score Analysis

### 📊 Score Distribution

- **Most wallets (over 90%)** fall in the **0–100 score range**, indicating poor or risky behavior.
- Very **few wallets** scored above 300, suggesting very limited examples of trustworthy usage in the dataset.
- The **maximum score is 1000**, assigned to the most active and responsible wallets.

### 📉 Summary Statistics

| Metric            | Value   |
|------------------|---------|
| Total Wallets     | 3497    |
| Average Score     | 29      |
| Maximum Score     | 1000    |

---

## 📊 Interpretation of Scores

| Score Range  | Interpretation               |
|--------------|------------------------------|
| 800–1000     | Excellent - Highly trustworthy |
| 500–799      | Good - Consistent behavior     |
| 300–499      | Average - Normal usage         |
| 100–299      | Below Average - Risk-prone     |
| 0–99         | Poor - Bot-like or inactive    |

---

## 🚀 How to Run

### 1. Clone the repo


git clone https://github.com/upasana1927/DeFi-credit-scoring-system.git
cd Defi-credit-scoring-system

2. Backend Setup (Flask + ML Model)

    cd backend
    pip install -r requirements.txt
    python app.py

3. Frontend Setup (React)

    cd frontend
    npm install
    npm start

🙋‍♀️ Author
Upasana Ghughtyal
B.Tech CSE, Graphic Era Hill University
GitHub: github.com/yourusername