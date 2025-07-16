import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [scores, setScores] = useState([]);

  const handleScoresLoaded = (newScores) => {
    setScores(newScores);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f7fa',
      padding: '20px 0'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          color: '#333',
          fontSize: '36px',
          fontWeight: 'bold'
        }}>
           DeFi Wallet Credit Score Analyzer
        </h1>

        <UploadForm onScoresLoaded={handleScoresLoaded} />

        {scores.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <ResultsDashboard scores={scores} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;