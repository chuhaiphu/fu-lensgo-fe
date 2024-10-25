import { Avatar } from "antd";
import { Button } from "../button/Button";
import "./ContentsSection.scss";

interface ContentsSectionProps {
  value?: string;
  content?: string;
  time?: string;
  status?: "none" | "pending" | "deny" | "success" | "feedback";
  isReady?: boolean;
  onClick?: () => void;
  isGroup?: boolean;
  avt?: string | null | undefined; // Allow avt to be null or undefined
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  styleClass?: string;
}

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";

function ContentsSection({
  value,
  content = "Chưa có dữ liệu",
  time,
  status,
  isReady = false,
  isGroup = false,
  avt,
  styleClass,
  prefix,
  suffix,
  onClick,
}: ContentsSectionProps) {
  return (
    <li
      className={`flex gap-2 items-center justify-between border border-[#D5D5D7] bg-white p-2 rounded-full hover:bg-gray-100 ${
        isReady && "bg-ready"
      } ${styleClass}`}
    >
      {prefix}
      <div
        className={`flex-1 flex justify-center items-center overflow-hidden ${
          content && "gap-10"
        }`}
      >
        {isGroup && <Avatar src={avt || DEFAULT_AVATAR} />}{" "}
        {/* Fallback to default avatar */}
        <div className={`${content ? "w-[60%]" : "w-0"}  truncate`}>
          <span className="text-sm-book text">{content}</span>
        </div>
        <span className="text-sm-medium flex-1 text-time">{time}</span>
      </div>
      {isReady ? (
        <div className="flex gap-3">
          <Button size="xs" fontSize="xs" styleClass="btn-schedule--reschedule">
            Dời lịch
          </Button>
          <Button size="xs" fontSize="xs" styleClass="btn-schedule--meeting">
            Đến phòng họp
          </Button>
        </div>
      ) : (
        <Button
          size="xxs"
          fontSize="xs"
          fontWeight="medium"
          onClick={status ? () => {} : onClick}
          status={status}
        >
          {value}
        </Button>
      )}
      {suffix}
    </li>
  );
}

export default ContentsSection;
