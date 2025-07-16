import React, { useState } from 'react';

const ScoreTable = ({ scores }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sorting function
  const sortedScores = React.useMemo(() => {
    let sortableScores = [...scores];
    if (sortConfig.key) {
      sortableScores.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableScores;
  }, [scores, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedScores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScores = sortedScores.slice(startIndex, endIndex);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return ' ↕';
  };

  const getScoreColor = (score) => {
    if (score >= 800) return '#28a745'; // Green
    if (score >= 600) return '#ffc107'; // Yellow
    if (score >= 400) return '#fd7e14'; // Orange
    return '#dc3545'; // Red
  };

  const getScoreLabel = (score) => {
    if (score >= 800) return 'Excellent';
    if (score >= 600) return 'Good';
    if (score >= 400) return 'Fair';
    return 'Poor';
  };

  return (
    <div style={{ 
      width: '90%', 
      margin: '20px auto',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e0e0e0',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6'
      }}>
        <h3 style={{ 
          margin: 0, 
          color: '#333',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
           Wallet Credit Scores
        </h3>
        <p style={{ 
          margin: '5px 0 0 0', 
          color: '#666',
          fontSize: '14px'
        }}>
          Total: {scores.length} wallets
        </p>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th 
                style={{ 
                  padding: '15px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontWeight: 'bold',
                  borderRight: '1px solid rgba(255,255,255,0.2)'
                }}
                onClick={() => handleSort('user')}
              >
                Wallet Address {getSortIcon('user')}
              </th>
              <th 
                style={{ 
                  padding: '15px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontWeight: 'bold',
                  borderRight: '1px solid rgba(255,255,255,0.2)'
                }}
                onClick={() => handleSort('credit_score')}
              >
                Credit Score {getSortIcon('credit_score')}
              </th>
              <th style={{ 
                padding: '15px',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {currentScores.map((item, index) => (
              <tr 
                key={index}
                style={{ 
                  backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff',
                  borderBottom: '1px solid #dee2e6',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.parentElement.style.backgroundColor = '#e3f2fd'}
                onMouseLeave={(e) => e.target.parentElement.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : '#ffffff'}
              >
                <td style={{ 
                  padding: '12px 15px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: '#495057',
                  maxWidth: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {item.user}
                </td>
                <td style={{ 
                  padding: '12px 15px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  <span style={{ 
                    color: getScoreColor(item.credit_score),
                    padding: '4px 8px',
                    backgroundColor: getScoreColor(item.credit_score) + '20',
                    borderRadius: '4px',
                    border: `1px solid ${getScoreColor(item.credit_score)}40`
                  }}>
                    {Math.round(item.credit_score)}
                  </span>
                </td>
                <td style={{ 
                  padding: '12px 15px',
                  textAlign: 'center'
                }}>
                  <span style={{ 
                    padding: '4px 8px',
                    backgroundColor: getScoreColor(item.credit_score),
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {getScoreLabel(item.credit_score)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ 
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #dee2e6',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px'
        }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              backgroundColor: currentPage === 1 ? '#e9ecef' : '#007bff',
              color: currentPage === 1 ? '#6c757d' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          
          <span style={{ 
            padding: '8px 12px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              backgroundColor: currentPage === totalPages ? '#e9ecef' : '#007bff',
              color: currentPage === totalPages ? '#6c757d' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ScoreTable;