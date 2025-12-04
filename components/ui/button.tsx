import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

type ButtonProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline" | "none";
    size?: "small" | "medium" | "large";
  };

const button = tv({
  base: `flex items-center justify-center rounded-md p-2`,
  variants: {
    variant: {
      primary: "bg-neutral-900 text-white hover:bg-neutral-800",
      secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
      outline:
        "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50",
      none: "bg-transparent text-neutral-900 hover:bg-neutral-100 hover:bg-transparent",
    },
    size: {
      small: "text-sm",
      medium: "text-md",
      large: "text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

function Button(props: ButtonProps) {
  const {
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    className = "",
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={button({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
