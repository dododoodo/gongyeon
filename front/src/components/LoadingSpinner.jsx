// components/LoadingSpinner.jsx
import React from 'react';
import "../styles/components.scss";

function LoadingSpinner() {
  return (
    <div className="loading_spinner">
      <div className="spinner" />
      <p>정보를 불러오는 중이에요...</p>
    </div>
  );
}

export default LoadingSpinner;
