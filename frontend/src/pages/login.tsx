import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  OutlinedInput,
  Typography,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import Api from "../Api";
import { useNavigate } from "react-router-dom";
import { AnimatedButton, MotionGrid } from "../components/FramerComponents";
import { Label } from "@mui/icons-material";
import { TypeWritter } from "../components/TypeWritter";

export const LoginScreen = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const isXs = useMediaQuery("(max-width:600px)"); // Extra small screens (phones)
  const isSm = useMediaQuery("(max-width:960px)"); // Small screens (tablets)
  const isMd = useMediaQuery("(max-width:1280px)"); // Medium screens (small laptops)
  const isLg = useMediaQuery("(max-width:1920px)");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, email: e.target.value }));
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleSubmit = async () => {
    if (user.email === "" && user.password === "") return;
    const response = await Api.postData("/api/login", user);
    console.log(response);
    setUser({ email: "", password: "" });
    if (response && response.status === "success") {
      navigate("/home");
    }
  };

  console.log(user, JSON.stringify(user));

  return (
    <MotionGrid style={mainContainer}>
      <MotionGrid
        style={{
          width: isXs ? "80%" : isSm ? "50%" : isMd ? "35" : "35%",
          height: isSm ? "45%" : isMd ? "45%" : "60%",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MotionGrid paddingBottom="20px" display="flex" justifyContent="center">
          <Typography fontFamily="PromptSemiBold">
            Login to enter Upload Env
          </Typography>
        </MotionGrid>
        <MotionGrid
          container
          spacing={2}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Grid item>
            <Typography>Email</Typography>
            <OutlinedInput value={user.email} onChange={handleEmailChange} />
          </Grid>
          <Grid item>
            <Typography>Password</Typography>
            <OutlinedInput
              type="password"
              value={user.password}
              onChange={passwordHandler}
            />
            <Typography>{user.password}</Typography>
            <Grid
              item
              display="flex"
              justifyContent="center"
              paddingTop="10px"
              paddingBottom="10px"
            >
              <AnimatedButton
                variant="contained"
                onClick={handleSubmit}
                whileTap={{ scale: 0.9 }}
                ripple={false}
              >
                Submit
              </AnimatedButton>
            </Grid>
            <MotionGrid
              item
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems={"center"}
            >
              <TypeWritter
                text="No Account yet?"
                speed={50}
                routeTo="/signup"
                linkText="signup"
                linkStyleObj={{ textAlign: "center", color: "#6439FF" }}
              />
            </MotionGrid>
          </Grid>
        </MotionGrid>
      </MotionGrid>
    </MotionGrid>
  );
};

const mainContainer = {
  backgroundColor: "#181C14",
  backgroundSize: "cover",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};
