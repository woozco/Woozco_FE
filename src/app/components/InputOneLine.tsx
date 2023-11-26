import React, { ChangeEvent } from 'react';

interface InputOneLineProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className: string;
  required?: boolean;
}

const InputOneLine: React.FC<InputOneLineProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  className,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-600 font-semibold mb-2">
        {label}:
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 ${className}`}
        required={required}
      />
    </div>
  );
};

export default InputOneLine;
