import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">Product Not Found</h2>
      <p className="not-found-message">
        The product you're looking for doesn't exist or has been removed.
        Please check the URL or browse our collections.
      </p>
      <Link to="/" className="back-btn">Back to Home</Link>
    </div>
  );
};

export default NotFoundPage; 