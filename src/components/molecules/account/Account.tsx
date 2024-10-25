import Avatar from "antd/es/avatar/avatar";
import { FC } from "react";

interface AccountProps {
  subTitle?: string;
  title?: string;
  src?: string;
}

const Account: FC<AccountProps> = ({ subTitle, title, src }) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col justify-center items-end">
        <p className="text-xs-book">{subTitle}</p>
        <h3 className="text-xl-medium">{title}</h3>
      </div>
      <div className="flex items-center">
        <Avatar
          className="h-14 w-14 border-[3px] border-white border-inset shadow-lg"
          src={src}
        />
      </div>
    </div>
  );
};

export default Account;
