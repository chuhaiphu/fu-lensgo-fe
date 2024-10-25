import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  BookOutlined,
  CalendarOutlined,
  HomeOutlined,
  PieChartOutlined,
  SettingOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Key } from "react";
import React from 'react'

export type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`${key}`}> {label} </Link>,
  } as MenuItem;
}

export const getLabel = (key?: Key): string | undefined => {
  return mentorItems.find((item) => item.key === key)?.label;
};
 

const mentorItems = [
  { label: "Trang Chủ", key: "home", icon: <HomeOutlined /> },
  { label: "Quản lí khách hàng", key: "customer", icon: <CalendarOutlined /> },
  { label: "Quản lí đặt lịch", key: "booking", icon: <BookOutlined /> },
  { label: "Quản lí Studio", key: "studio", icon: <BookOutlined />},
];

export const mentorMenuItems: MenuItem[] = mentorItems.map((item) =>
  getItem(item.label, item.key, item.icon)
);
