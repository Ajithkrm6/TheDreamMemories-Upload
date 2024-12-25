import React from "react";
import { AnimatedButton } from "../FramerComponents";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/login");
  };
  return (
    <div style={{ width: "100%" }}>
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <div style={{ paddingLeft: "10px" }}>
          <h3 style={{ color: "#000000" }}>Tdm</h3>
        </div>
        <div>
          <AnimatedButton onClick={logoutHandler}>Logout</AnimatedButton>
        </div>
      </header>
    </div>
  );
};
