// components/BaSelect.js

import React from "react";

const BaSelect = ({ id, label, value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-lg font-semibold mb-2">
        {label && `${label}:`}
      </label>

      <select
        id={id}
        className="w-full p-2 border border-gray-300 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BaSelect;
