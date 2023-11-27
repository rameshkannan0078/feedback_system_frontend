import React from 'react';

export const BaLabel = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="text-sm font-medium text-gray-600 block">
      {children}
    </label>
  );