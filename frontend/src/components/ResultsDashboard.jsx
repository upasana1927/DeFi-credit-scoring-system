import React, { useState } from 'react';
import ScoreChart from './ScoreChart';
import ScoreTable from './ScoreTable';

const ResultsDashboard = ({ scores }) => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'chart', 'table'

  // Calculate stats for cards
  const totalWallets = scores.length;
  const avgScore = Math.round(scores.reduce((sum, s) => sum + s.credit_score, 0) / scores.length);
  const maxScore = Math.round(Math.max(...scores.map(s => s.credit_score)));
  const minScore = Math.round(Math.min(...scores.map(s => s.credit_score)));

  // Score distribution for quick stats
  const scoreRanges = {
    excellent: scores.filter(s => s.credit_score >= 800).length,
    good: scores.filter(s => s.credit_score >= 600 && s.credit_score < 800).length,
    fair: scores.filter(s => s.credit_score >= 400 && s.credit_score < 600).length,
    poor: scores.filter(s => s.credit_score < 400).length
  };

  // Navigation functions
  const goToChart = () => setCurrentView('chart');
  const goToTable = () => setCurrentView('table');
  const goToDashboard = () => setCurrentView('dashboard');

  const Card = ({ title, icon, onClick, children }) => (
    <div 
      onClick={onClick}
      style={{
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e0e0e0',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 123, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>{icon}</div>
        <h3 style={{ 
          margin: '0 0 15px 0', 
          color: '#333',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );

  const StatCard = ({ title, value, color, icon, subtitle }) => (
    <div style={{
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e0e0e0',
      textAlign: 'center',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: color,
        marginBottom: '5px'
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '14px', 
        color: '#666',
        fontWeight: 'bold'
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ 
          fontSize: '12px', 
          color: '#999',
          marginTop: '3px'
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );

  const BackButton = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        padding: '12px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#0056b3';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#007bff';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      ← Back to Dashboard
    </button>
  );

  // Chart View
  if (currentView === 'chart') {
    return (
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        padding: '80px 20px 20px 20px'
      }}>
        <BackButton onClick={goToDashboard} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '30px',
            color: '#333',
            fontSize: '32px',
            fontWeight: 'bold'
          }}>
             Credit Score Distribution Chart
          </h2>
          <ScoreChart scores={scores} />
        </div>
      </div>
    );
  }

  // Table View
  if (currentView === 'table') {
    return (
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        padding: '80px 20px 20px 20px'
      }}>
        <BackButton onClick={goToDashboard} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '30px',
            color: '#333',
            fontSize: '32px',
            fontWeight: 'bold'
          }}>
             Detailed Credit Score Table
          </h2>
          <ScoreTable scores={scores} />
        </div>
      </div>
    );
  }

  // Dashboard View (default)
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        color: '#333',
        fontSize: '28px',
        fontWeight: 'bold'
      }}>
         Credit Score Analysis Dashboard
      </h2>

      {/* Summary Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        <StatCard 
          title="Total Wallets" 
          value={totalWallets}
          color="#007bff"
          icon="👤"
        />
        <StatCard 
          title="Average Score" 
          value={avgScore}
          color="#28a745"
          icon="📈"
        />
        <StatCard 
          title="Highest Score" 
          value={maxScore}
          color="#ffc107"
          icon="🏆"
        />
        <StatCard 
          title="Lowest Score" 
          value={minScore}
          color="#dc3545"
          icon="📉"
        />
      </div>

      {/* Score Distribution Quick Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '15px',
        marginBottom: '40px'
      }}>
        <StatCard 
          title="Excellent" 
          value={scoreRanges.excellent}
          color="#28a745"
          icon="🌟"
          subtitle="800-1000"
        />
        <StatCard 
          title="Good" 
          value={scoreRanges.good}
          color="#ffc107"
          icon="👍"
          subtitle="600-799"
        />
        <StatCard 
          title="Fair" 
          value={scoreRanges.fair}
          color="#fd7e14"
          icon="⚠️"
          subtitle="400-599"
        />
        <StatCard 
          title="Poor" 
          value={scoreRanges.poor}
          color="#dc3545"
          icon="❌"
          subtitle="0-399"
        />
      </div>

      {/* Navigation Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px',
        marginBottom: '40px'
      }}>
        <Card 
          title="View Score Distribution Chart"
          icon="📊"
          onClick={goToChart}
        >
          <p style={{ 
            color: '#666', 
            fontSize: '14px',
            margin: '0 0 15px 0',
            lineHeight: '1.5'
          }}>
            Visualize the distribution of credit scores across different ranges with an interactive bar chart.
          </p>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}>
            📈 Open Chart View
          </button>
        </Card>

        <Card 
          title="View Detailed Score Table"
          icon="📋"
          onClick={goToTable}
        >
          <p style={{ 
            color: '#666', 
            fontSize: '14px',
            margin: '0 0 15px 0',
            lineHeight: '1.5'
          }}>
            Browse through individual wallet addresses and their credit scores with sorting and pagination.
          </p>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}>
            📊 Open Table View
          </button>
        </Card>
      </div>


    </div>
  );
};

export default ResultsDashboard;