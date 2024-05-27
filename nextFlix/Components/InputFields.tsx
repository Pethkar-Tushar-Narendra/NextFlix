import React from "react";

interface inputProps {
  value: any;
  onChange: (value: any) => void;
  type: any;
  label: string;
}

const InputFields: React.FC<inputProps> = ({
  value,
  onChange,
  type,
  label,
}) => {
  return (
    <>
      <label>{label}</label>
      <input value={value} onChange={onChange} type={type} />
    </>
  );
};

export default InputFields;
