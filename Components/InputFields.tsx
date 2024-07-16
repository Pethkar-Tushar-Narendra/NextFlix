import React from "react";

interface inputProps {
  value: any;
  onChange: (value: any) => void;
  onFocus: (value: any) => void;
  type: any;
  label: string;
  placeholder: string;
  className: string;
  autoFocus: boolean;
}

const InputFields: React.FC<inputProps> = ({
  value,
  onChange,
  type,
  label,
  placeholder,
  className,
  onFocus,
  autoFocus,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        value={value}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
        onChange={onChange}
        type={type}
        onFocus={onFocus}
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputFields;
