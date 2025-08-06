// src/components/Header.jsx
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <h1>
        <span className="title-gradient">AI Figma-to-Code</span>
      </h1>
      <p className="subtitle">Describe your UI, and let AI bring it to life</p>
    </header>
  );
}

export default Header;