import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onScoresLoaded }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = async () => {
    // Validate file selection
    if (!file) {
      setError('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setUploaded(false);
      
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('http://localhost:5000/score', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      onScoresLoaded(res.data);
      setUploaded(true);
      
    } catch (err) {
      console.error('Upload error:', err);
      
      // Handle different error types
      if (err.response) {
        // Server responded with error status
        setError(err.response.data.error || 'Server error occurred');
      } else if (err.request) {
        // Request was made but no response received
        setError('No response from server. Please check if the server is running.');
      } else {
        // Something else happened
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNewUpload = () => {
    setFile(null);
    setUploaded(false);
    setError(null);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: 'bold',
          color: '#333'
        }}>
          📁 Select File to Upload
        </label>
        <input 
          type="file" 
          onChange={e => setFile(e.target.files[0])}
          disabled={loading}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: loading ? '#f5f5f5' : '#fff'
          }}
        />
        {file && (
          <div style={{ 
            marginTop: '8px', 
            fontSize: '14px', 
            color: '#666',
            padding: '5px 10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #e9ecef'
          }}>
            Selected: {file.name}
          </div>
        )}
      </div>
      
      <button 
        onClick={uploaded ? handleNewUpload : handleSubmit}
        disabled={loading || (!file && !uploaded)}
        style={{
          padding: '12px 24px',
          backgroundColor: uploaded ? '#28a745' : (loading ? '#6c757d' : '#007bff'),
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          minWidth: '150px',
          transition: 'all 0.3s ease'
        }}
      >
        {loading ? '⏳ Processing...' : 
         uploaded ? '✅ Uploaded! Upload New' : 
         'Upload & Score'}
      </button>
      
      {loading && (
        <div style={{ marginTop: '15px', color: '#007bff' }}>
          <div style={{ fontSize: '14px', marginBottom: '8px' }}>
            📤 Uploading file and processing...
          </div>
          <div style={{ marginTop: '5px' }}>
            <div 
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#e0e0e0',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#007bff',
                  animation: 'loadingBar 2s infinite',
                  transform: 'translateX(-100%)'
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {uploaded && !loading && (
        <div style={{ 
          marginTop: '15px', 
          padding: '12px', 
          backgroundColor: '#d4edda', 
          color: '#155724',
          borderRadius: '6px',
          border: '1px solid #c3e6cb',
          fontSize: '14px'
        }}>
          ✅ File uploaded and processed successfully! Check the results below.
        </div>
      )}
      
      {error && (
        <div style={{ 
          marginTop: '15px', 
          padding: '12px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24',
          borderRadius: '6px',
          border: '1px solid #f5c6cb',
          fontSize: '14px'
        }}>
          ❌ {error}
        </div>
      )}
      
      <style>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default UploadForm;