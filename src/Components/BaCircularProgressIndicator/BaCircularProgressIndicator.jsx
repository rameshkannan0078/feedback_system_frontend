import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const BaCircularProgressIndicator = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress color="primary" size={80} />
    </div>
  );
};

export default BaCircularProgressIndicator;
