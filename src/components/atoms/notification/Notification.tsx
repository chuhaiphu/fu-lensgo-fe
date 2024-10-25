import { Badge, Dropdown, MenuProps } from "antd";
import { FontSize, FontWeight } from "../../../constants/typography";

export interface NotificationProps {
  /** What tailwind class want to use for customizing Badge? */
  styleClass?: string;
  /** The weight of the font used in the Badge text. */
  fontWeight?: FontWeight;
  /** The size of the font used in the Badge text. */
  fontSize?: FontSize;
  /** Badge children'ss contents */
  children?: React.ReactNode;
  /** Notification items in menu dropdown */
  items: MenuProps["items"];
  /** Dropdown placement */
  placement?:
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
    | "top"
    | "bottom";
  /** Badge contents */
  count?: React.ReactNode;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Notification = ({
  fontSize = "base",
  fontWeight = "medium",
  styleClass,
  items,
  placement,
  children,
  count,
  ...props
}: NotificationProps) => {
  return (
    <>
      <Dropdown menu={{ items }} placement={placement}>
        <Badge
          className={[`text-${fontSize}-${fontWeight}`, styleClass].join(" ")}
          count={count}
          {...props}
        >
          {children}
        </Badge>
      </Dropdown>
    </>
  );
};
