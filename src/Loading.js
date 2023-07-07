import React from 'react'

export default function Loading() {
    return (
      <div className="loading-container">
      <div className="loading-overlay"></div>
      <div className="loading-spinner"></div>
      <h2 className="loading-message">Loading...</h2>
    </div>
    )
}
