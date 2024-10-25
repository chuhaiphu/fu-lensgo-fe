import { Card } from "antd";
import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export function CustomizedCard ({
  styleClass,
  background = "",
  loading,
  children,
  ...props
})  {
  return loading ? (
    <Skeleton height="100%" width="100%" className="rounded-2xl"/>
  ) : (
    <Card  
      className={[`w-full h-full bg-cover`, styleClass].join(" ")}
      style={{ backgroundImage: background }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default CustomizedCard;
