import React, { useState } from 'react';
import { Home, DollarSign, MapPin, Users, Bed, Building } from 'lucide-react';

export default function HousingPredictor() {
  const [formData, setFormData] = useState({
    longitude: -122.42,
    latitude: 37.80,
    housing_median_age: 52.0,
    total_rooms: 3321.0,
    total_bedrooms: 1115.0,
    population: 1576.0,
    households: 1034.0,
    median_income: 2.0987,
    ocean_proximity: 'NEAR BAY'
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const oceanProximityOptions = [
    'NEAR BAY',
    '<1H OCEAN',
    'INLAND',
    'NEAR OCEAN',
    'ISLAND'
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://california-house-sale-fastapi.onrender.com/predict_single', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Ey! Prediction failed!');
      }
      
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ocean_proximity' ? value : parseFloat(value)
    }));
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body, html, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        }
      `}</style>
      <div style={styles.container}>
      
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>
              <Home size={40} style={styles.icon} />
              California Housing Price Predictor
            </h1>
            <p style={styles.subtitle}>Ey! Enter the details and we'll tell ya what it's worth!</p>
          </div>

          <div style={styles.formContainer}>
            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <MapPin size={16} style={styles.labelIcon} />
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.longitude}
                  onChange={(e) => handleChange('longitude', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <MapPin size={16} style={styles.labelIcon} />
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.latitude}
                  onChange={(e) => handleChange('latitude', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Building size={16} style={styles.labelIcon} />
                  Housing Median Age
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.housing_median_age}
                  onChange={(e) => handleChange('housing_median_age', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Building size={16} style={styles.labelIcon} />
                  Total Rooms
                </label>
                <input
                  type="number"
                  step="1"
                  value={formData.total_rooms}
                  onChange={(e) => handleChange('total_rooms', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Bed size={16} style={styles.labelIcon} />
                  Total Bedrooms
                </label>
                <input
                  type="number"
                  step="1"
                  value={formData.total_bedrooms}
                  onChange={(e) => handleChange('total_bedrooms', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Users size={16} style={styles.labelIcon} />
                  Population
                </label>
                <input
                  type="number"
                  step="1"
                  value={formData.population}
                  onChange={(e) => handleChange('population', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Home size={16} style={styles.labelIcon} />
                  Households
                </label>
                <input
                  type="number"
                  step="1"
                  value={formData.households}
                  onChange={(e) => handleChange('households', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <DollarSign size={16} style={styles.labelIcon} />
                  Median Income
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.median_income}
                  onChange={(e) => handleChange('median_income', e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroupFull}>
                <label style={styles.label}>Ocean Proximity</label>
                <select
                  value={formData.ocean_proximity}
                  onChange={(e) => handleChange('ocean_proximity', e.target.value)}
                  style={styles.select}
                >
                  {oceanProximityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {})
              }}
            >
              {loading ? 'Making Prediction...' : 'Predict Price'}
            </button>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <p style={styles.errorTitle}>Madone! Error:</p>
              <p>{error}</p>
            </div>
          )}

          {prediction !== null && (
            <div style={styles.successBox}>
              <div style={styles.predictionContent}>
                <p style={styles.predictionLabel}>Predicted House Value:</p>
                <p style={styles.predictionValue}>
                  ${(prediction * 100000).toLocaleString('en-US', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </p>
                <p style={styles.predictionNote}>
                  (Model output: {prediction.toFixed(4)} × 100,000)
                </p>
              </div>
            </div>
          )}

          <div style={styles.noteBox}>
            <p style={styles.noteText}>
              <strong>Note:</strong> Make sure your FastAPI server is running on http://localhost:8000
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  wrapper: {
    width: '100%',
    maxWidth: '1000px',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  icon: {
    color: '#667eea',
  },
  subtitle: {
    color: '#718096',
    fontSize: '1.1rem',
  },
  formContainer: {
    marginBottom: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroupFull: {
    display: 'flex',
    flexDirection: 'column',
    gridColumn: '1 / -1',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },
  labelIcon: {
    marginRight: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s',
    outline: 'none',
  },
  select: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s',
    outline: 'none',
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    backgroundColor: '#667eea',
    color: 'white',
    fontWeight: 'bold',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#cbd5e0',
    cursor: 'not-allowed',
  },
  errorBox: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#fee',
    border: '2px solid #f56565',
    borderRadius: '8px',
    color: '#c53030',
  },
  errorTitle: {
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  successBox: {
    marginTop: '1.5rem',
    padding: '1.5rem',
    backgroundColor: '#f0fdf4',
    border: '2px solid #10b981',
    borderRadius: '8px',
  },
  predictionContent: {
    textAlign: 'center',
  },
  predictionLabel: {
    color: '#374151',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  predictionValue: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: '0.5rem',
  },
  predictionNote: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  noteBox: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  noteText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    textAlign: 'center',
  },
};