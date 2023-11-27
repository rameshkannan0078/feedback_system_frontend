
import React from 'react';
export const BaInputField = ({ type, name, id, placeholder, value, onChange }) => (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-4"
      value={value}
      onChange={onChange}
      required
    />
  );
  