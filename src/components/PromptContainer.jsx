import React, { useState } from 'react';
import './PromptContainer.css';
import { LoaderFive, LoaderFour } from './ui/Loaders'; 

// Accept the 'onGenerationComplete' prop from App.jsx
const PromptContainer = ({ onGenerationComplete }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateClick = () => {
    if (!prompt || isLoading) {
      return;
    }

    setIsLoading(true);

    // Simulate the AI working
    setTimeout(() => {
      setIsLoading(false);
      
      // --- THIS IS THE KEY ---
      // Call the function from App.jsx to switch to the results page
      onGenerationComplete();

    }, 4000);
  };

  return (
    <div className="prompt-container">
      <textarea
        className="prompt-textarea"
        placeholder="e.g., 'A modern landing page for a SaaS company...'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
      />
      <button
        className={`generate-button ${isLoading ? 'loading' : ''}`}
        onClick={handleGenerateClick}
        disabled={isLoading}
      >
        {isLoading ? <LoaderFive text="Generating..." /> : '✨ Generate'}
      </button>
    </div>
  );
};

export default PromptContainer;
