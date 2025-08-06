import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'; // Corrected to capital 'H'
import PromptContainer from './components/PromptContainer';
import StarryBackground from './components/StarryBackground';
import OutputDisplay from './components/OutputDisplay'; // Import the new component

function App() {
  // This state controls which screen is visible
  const [isGenerated, setIsGenerated] = useState(false);

  // This function will be passed to the PromptContainer
  const handleGenerationComplete = () => {
    setIsGenerated(true);
  };

  // This function will be passed to the OutputDisplay
  const handleStartOver = () => {
    setIsGenerated(false);
  };

  return (
    <div className="main-layout">
      <StarryBackground />
      <main className="content-container">
        <Header />
        
        {/* This logic shows the correct component based on the state */}
        {isGenerated ? (
          <OutputDisplay onStartOver={handleStartOver} />
        ) : (
          <PromptContainer onGenerationComplete={handleGenerationComplete} />
        )}
      </main>
    </div>
  );
}

export default App;
