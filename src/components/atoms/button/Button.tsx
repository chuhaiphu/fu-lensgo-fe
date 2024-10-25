import { FontSize, FontWeight } from "../../../constants/typography";
import "./index.scss";
export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  variant?: "frosted-glass" | "outlined" | "default";
  /** What tailwind class want to use for customizing button? */
  styleClass?: string;
  /** What is color of the button? */
  background?: string;
  /** How large should the button be? */
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** The weight of the font used in the button text. */
  fontWeight?: FontWeight;
  /** The size of the font used in the button text. */
  fontSize?: FontSize;
  /** Button type (button, submit, reset) */
  type?: "button" | "submit" | "reset";
  /** Button contents */
  children: React.ReactNode;
  /** Optional click handler */
  onClick?: Function;
  /*** background button */
  status?: "default" | "pending" | "deny" | "date" | "success" | "feedback" | "none";
  /** The type of the button (button, submit, reset) */
  isDisabled?: boolean;
}

/** Primary UI component for user interaction */
export const Button = ({
  variant = "default",
  fontSize = "base",
  fontWeight = "medium",
  size = "md",
  styleClass,
  background,
  children,
  type = "button",
  status = "default",
  isDisabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={[
        `text-${fontSize}-${fontWeight} h-fit`,
        size,
        variant,
        variant === "default" ? background : "",
        isDisabled
          ? "bg-gray-400 text-gray-600 cursor-not-allowed pointer-events-none"
          : "",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        isDisabled && "opacity-65",
        `btn-content-status-${status} btn-content-status  ${
          !status && "btn-content"
        } `,
        styleClass,
      ].join(" ")}
      type={type}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};
