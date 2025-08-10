import React from "react";
import classNames from "classnames";
import "./button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: "contained" | "text";
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "contained",
  className,
  disabled,
  children,
  ...rest
}) => {
  const buttonClass = classNames("btn", variant, { disabled }, className);

  return (
    <div className="btn-container">
      <button className={buttonClass} disabled={disabled} {...rest}>
        {label ?? children}
      </button>
    </div>
  );
};

export default React.memo(Button);
