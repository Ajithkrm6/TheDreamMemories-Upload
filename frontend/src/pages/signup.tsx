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
import { Link, useNavigate } from "react-router-dom";
import { AnimatedTypography, MotionGrid } from "../components/FramerComponents";

export const SignupScreen = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    bio: "",
    social_links: {},
  });
  const navigate = useNavigate();
  const isXs = useMediaQuery("(max-width:600px)"); // Extra small screens (phones)
  const isSm = useMediaQuery("(max-width:960px)"); // Small screens (tablets)
  const isMd = useMediaQuery("(max-width:1280px)"); // Medium screens (small laptops)
  const isLg = useMediaQuery("(max-width:1920px)");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, password: e.target.value }));
  };

  return (
    <MotionGrid style={mainContainer} sm={12}>
      <MotionGrid
        sm={12}
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
        <AnimatedTypography>TDM_Upload</AnimatedTypography>
        <MotionGrid
          padding="15px"
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          bgcolor="red"
        >
          <MotionGrid
            item
            sm={12}
            md={6}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Box>
              <Typography textAlign="start">User Name</Typography>
            </Box>

            <OutlinedInput value={user.email} onChange={handleEmailChange} />
          </MotionGrid>
          <MotionGrid
            item
            sm={12}
            md={6}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Typography>User Name</Typography>
            <OutlinedInput value={user.email} onChange={handleEmailChange} />
          </MotionGrid>
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

{
  /* <MotionGrid style={mainContainer} sm={12}>
<MotionGrid
  sm={12}
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
); */
}
