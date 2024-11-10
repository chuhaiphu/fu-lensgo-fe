import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { getLabel, mentorMenuItems } from "../../../constants/menuItems";
import Header from "../../organisms/header";
import { Button } from "../../atoms/button/Button";
import { LogoutOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [currentItem, setCurrentItem] = useState(mentorMenuItems[0]);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Excute when click "Logout" button
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ position: "fixed", height: "100vh" }}
      >
        <div className="flex py-9 flex-col justify-between h-full">
          <img className="demo-logo-vertical h-9" src="/src/assets/logo.svg" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={mentorMenuItems}
            onClick={(e) => setCurrentItem(e)}
          />
          <Button
            onClick={handleLogout}
            styleClass="h-[51px] w-[51px] text-white flex justify-center items-center bg-gradient-to-b from-[#504C51] to-[#323033]"
          >
            <LogoutOutlined className="text-[18px] stroke-white stroke-[10px]" />
          </Button>
        </div>
      </Sider>
      <Layout
        style={{ padding: "0 26px 0 106px", background: colorBgContainer }}
      >
        <Header title={getLabel(currentItem?.key)} />
        <Content>
          <div
            style={{
              minHeight: 360,
              height: "88vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              position: "relative",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
