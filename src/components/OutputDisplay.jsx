import React from 'react';
import './OutputDisplay.css';

// This component receives a function 'onStartOver' as a prop
const OutputDisplay = ({ onStartOver }) => {
  return (
    <div className="output-container">
      <h2 className="output-title">Your Design is Ready!</h2>
      
      {/* Figma Preview Placeholder */}
      <div className="figma-preview-placeholder">
        <img 
          src="https://placehold.co/800x600/1a1d23/ffffff?text=Figma+Preview" 
          alt="Figma design preview" 
        />
        <div className="overlay-text">Figma Preview</div>
      </div>
      
      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-btn download-btn">Download Figma File</button>
        <button className="action-btn export-btn">Export Code</button>
      </div>
      
      {/* Start Over Button */}
      <button className="start-over-btn" onClick={onStartOver}>
        &larr; Start Over
      </button>
    </div>
  );
};

export default OutputDisplay;
