import React from 'react';

export const LoadingComponent = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      ... Loading ...
    </div>
  );
};
