import React from "react";

interface inputProps {
  value: any;
  onChange: (value: any) => void;
  onFocus: (value: any) => void;
  type: any;
  label: string;
  placeholder: string;
  className: string;
}

const InputFields: React.FC<inputProps> = ({
  value,
  onChange,
  type,
  label,
  placeholder,
  className,
  onFocus,
}) => {
  return (
    <>
      <label>{label}</label>
      <input value={value} onChange={onChange} type={type} onFocus={onFocus} />
    </>
  );
};

export default InputFields;
