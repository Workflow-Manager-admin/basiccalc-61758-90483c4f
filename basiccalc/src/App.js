import React from 'react';
import './App.css';
import BasicCalc from './BasicCalc';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      {/* Optionally, leave a minimal navbar for branding */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA BasicCalc
            </div>
          </div>
        </div>
      </nav>
      <main>
        {/* The main calculator container */}
        <BasicCalc />
      </main>
    </div>
  );
}

export default App;