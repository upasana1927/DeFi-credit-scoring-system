import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ScoreChart = ({ scores }) => {
  const buckets = Array(10).fill(0);
  scores.forEach(({ credit_score }) => {
    const index = Math.min(Math.floor(credit_score / 100), 9);
    buckets[index]++;
  });

  const data = {
    labels: ['0-100','100-200','200-300','300-400','400-500','500-600','600-700','700-800','800-900','900-1000'],
    datasets: [
      {
        label: 'Number of Wallets',
        data: buckets,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',   // Red for low scores
          'rgba(255, 159, 64, 0.8)',   // Orange
          'rgba(255, 205, 86, 0.8)',   // Yellow
          'rgba(75, 192, 192, 0.8)',   // Teal
          'rgba(54, 162, 235, 0.8)',   // Blue
          'rgba(153, 102, 255, 0.8)',  // Purple
          'rgba(201, 203, 207, 0.8)',  // Grey
          'rgba(255, 99, 255, 0.8)',   // Pink
          'rgba(99, 255, 132, 0.8)',   // Green
          'rgba(132, 255, 99, 0.8)'    // Light green for high scores
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(255, 99, 255, 1)',
          'rgba(99, 255, 132, 1)',
          'rgba(132, 255, 99, 1)'
        ],
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#333'
        }
      },
      title: {
        display: true,
        text: 'Credit Score Distribution',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: '#333',
        padding: 20
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#007bff',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12
          },
          color: '#666'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          },
          color: '#666'
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div style={{ 
      width: '90%', 
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <div style={{ height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h4 style={{ 
          margin: '0 0 10px 0', 
          color: '#333',
          fontSize: '16px'
        }}>
           Summary Statistics
        </h4>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ 
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Total Wallets: {scores.length}
          </span>
          <span style={{ 
            padding: '5px 10px',
            backgroundColor: '#28a745',
            color: 'white',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Avg Score: {Math.round(scores.reduce((sum, s) => sum + s.credit_score, 0) / scores.length)}
          </span>
          <span style={{ 
            padding: '5px 10px',
            backgroundColor: '#ffc107',
            color: '#212529',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Max Score: {Math.round(Math.max(...scores.map(s => s.credit_score)))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;