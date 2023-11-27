import React, { ChangeEvent } from 'react';

interface InputOneLineProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className: string;
  type?: string; // 'type' 속성 추가
  required?: boolean;
}

const InputOneLine: React.FC<InputOneLineProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  type="text",
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-600 font-semibold mb-2">
        {label}:
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded px-3 py-2 text-gray-600 focus:border-blue-500`}
        required={required}
      />
    </div>
  );
};

export default InputOneLine;
