import React from "react";
import { AnimatedButton } from "../FramerComponents";

export const Header = () => {
  const logoutHandler = () => {};

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
          <AnimatedButton>Logout</AnimatedButton>
        </div>
      </header>
    </div>
  );
};
