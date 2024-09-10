import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { UserOutlined, DashboardOutlined, DownOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Button, message, Dropdown } from "antd";
import logo from "../../assets/logo.png";
import Dashboard from "../../pages/home";
import VehicleManage from "../../pages/vehiclemanage";
import CarCreate from "../../pages/vehiclemanage/create";
import CarEdit from "../../pages/vehiclemanage/edit";
import ProfilePage from "../../pages/profile"; // Import your ProfilePage component

const { Header, Content, Footer } = Layout;

const FullLayout: React.FC = () => {
  const navigate = useNavigate();
  const page = localStorage.getItem("page");
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  const Logout = () => {
    localStorage.clear();
    messageApi.success("Logout successful");
    setTimeout(() => {
      navigate("/"); // Redirect to home page after logout
    }, 2000);
  };

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === "logout") {
      Logout();
    } else if (e.key === "profile") {
      navigate('/profile'); // Navigate to the profile page
    }
  };

  const userMenu = (
    <Menu
      onClick={handleMenuClick}
      style={{ 
        fontFamily: 'Kanit, sans-serif',
        backgroundColor: '#003366',
        color: '#FFD700',
        border: 'none'
      }}
    >
      <Menu.Item
        key="profile"
        style={{ 
          fontFamily: 'Kanit, sans-serif',
          color: '#FFD700',
          transition: 'background 0.3s',
          backgroundColor: 'transparent',
          borderRadius: '4px',
        }}
      >
        <UserOutlined style={{ marginRight: '8px', color: '#FFD700' }} />
        Profile
      </Menu.Item>
      <Menu.Item
        key="logout"
        style={{ 
          fontFamily: 'Kanit, sans-serif',
          color: '#FFD700',
          transition: 'background 0.3s',
          backgroundColor: 'transparent',
          borderRadius: '4px',
        }}
      >
        <UserOutlined style={{ marginRight: '8px', color: '#FFD700' }} />
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh", fontFamily: 'Kanit, sans-serif', backgroundColor: '#003366' }}>
      {contextHolder}
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Header style={{ background: "#003366", height: "80px", padding: "0 16px", position: 'fixed', width: '100%', top: 0, zIndex: 1000 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* Left Section: Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="Logo" style={{ width: "60px", height: "auto", marginRight: "16px" }} />
            </div>
            
            {/* Right Section: Menu and User Dropdown */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[page ? page : "dashboard"]}
                style={{ 
                  background: "transparent", 
                  border: 'none', 
                  marginRight: '16px',
                  lineHeight: '64px',
                  fontFamily: 'Kanit, sans-serif'
                }}
              >
                <Menu.Item
                  key="dashboard"
                  onClick={() => setCurrentPage("dashboard")}
                  style={{ 
                    borderRadius: '4px', 
                    transition: 'background 0.3s', 
                    background: page === "dashboard" ? "#1a2a40" : "transparent",
                    marginRight: '16px', 
                    color: '#FFD700'
                  }}
                >
                  <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#FFD700', fontFamily: 'Kanit, sans-serif' }}>
                    <DashboardOutlined style={{ marginRight: '8px' }} />
                    <span>RentCar</span>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="vehiclemanage"
                  onClick={() => setCurrentPage("vehiclemanage")}
                  style={{ 
                    borderRadius: '4px', 
                    transition: 'background 0.3s', 
                    background: page === "vehiclemanage" ? "#1a2a40" : "transparent",
                    color: '#FFD700'
                  }}
                >
                  <Link to="/vehiclemanage" style={{ display: 'flex', alignItems: 'center', color: '#FFD700', fontFamily: 'Kanit, sans-serif' }}>
                    <UserOutlined style={{ marginRight: '8px' }} />
                    <span>Vehicle Management</span>
                  </Link>
                </Menu.Item>
              </Menu>
              <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
                <Button
                  style={{ 
                    backgroundColor: "#003366", 
                    color: "#FFD700", 
                    border: 'none', 
                    fontFamily: 'Kanit, sans-serif',
                    borderRadius: '4px',
                    marginLeft: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    padding: '0 16px',
                    height: '40px'
                  }}
                >
                  <UserOutlined style={{ marginRight: '8px', fontSize: '18px' }} />
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>
        </Header>

        <Layout style={{ marginTop: "80px", display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Content style={{ flex: 1, margin: "0", padding: '16px', background: "#FFFFFF", minHeight: 'calc(100vh - 80px - 64px)' }}>
            <Breadcrumb style={{ margin: "16px 0" }} />
            <div
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/vehiclemanage" element={<VehicleManage />} />
                <Route path="/vehiclemanage/create" element={<CarCreate />} />
                <Route path="/vehiclemanage/edit/:id" element={<CarEdit />} />
                <Route path="/profile" element={<ProfilePage />} /> {/* Add route for profile page */}
              </Routes>
            </div>
          </Content>

          <Footer style={{ textAlign: "center", background: "#003366", color: "#FFD700", height: '64px', fontFamily: 'Kanit, sans-serif' }}>
            TWN RENT CAR
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FullLayout;
