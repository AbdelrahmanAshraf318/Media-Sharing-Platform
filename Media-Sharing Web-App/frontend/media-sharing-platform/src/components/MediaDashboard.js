import React from 'react';
import MediaUploadPage from './MediaUploadPage';
import MediaRetrievalPage from './MediaRetrievalPage';

const MediaDashboard = () => (
  <div>
    <h2 style={{backgroundColor: 'cyan'}}>Media Dashboard</h2>
    <MediaUploadPage />
    <MediaRetrievalPage />
  </div>
);

export default MediaDashboard;