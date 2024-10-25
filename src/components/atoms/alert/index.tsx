import { IoWarningSharp } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import "./index.scss";
import { memo, useMemo } from "react";
interface AlertProps {
  message?: string;
  type?: "error" | "success";
  open?: boolean;
  onCancel?: () => void;
  timeClose?: number;
}
function Alert({
  message,
  type = "error",
  open = false,
  onCancel,
  timeClose = 3,
}: AlertProps) {
  const timer = useMemo(
    () =>
      setInterval(() => {
        timeClose -= 1;
      }, 1000),
    []
  );
  setTimeout(() => {
    clearInterval(timer);
    onCancel();
  }, timeClose * 1000);

  return (
    <div
      onClick={onCancel}
      className={`alert-layout ${open && "alert-layout--open"}`}
    >
      <div className={`alert-container alert-container--${type}`}>
        <span>
          {type == "error" ? (
            <IoWarningSharp className="icon icon-error" color="white" />
          ) : (
            <FaCircleCheck className="icon icon-success" color="white" />
          )}
        </span>
        <p className="text-base-medium text-white text-center">{message}</p>
      </div>
    </div>
  );
}

export default memo(Alert);
