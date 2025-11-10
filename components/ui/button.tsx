import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface IButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "none";
}

const variantStyles = {
  primary: "bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 disabled:opacity-50",
  outline:
    "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 disabled:opacity-50",
  none: "bg-transparent text-neutral-900 hover:bg-neutral-100 disabled:opacity-50",
};

function Button(props: IButtonProps) {
  const {
    children,
    type = "button",
    variant = "primary",
    className = "",
    onClick,
    disabled = false,
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={`flex items-center rounded-md p-2 ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
