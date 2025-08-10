import React from "react";
import "./textField.scss";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  isError?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  required,
  isError,
  value,
  className,
  style,
  ...rest
}) => {
  const inputStyle = {
    ...style,
    borderColor: isError ? "#E11D48" : "#d0d7de",
  };

  return (
    <div className="textfield-container">
      {label && (
        <label className="textfield-label">
          {label}
          {required && <span className="textfield-required">*</span>}
        </label>
      )}
      <input
        className={`textfield-input ${className || ""}`}
        value={value}
        style={inputStyle}
        {...rest}
      />
    </div>
  );
};

export default React.memo(TextField);
