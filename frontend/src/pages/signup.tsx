import React, { useState } from "react";
import { OutlinedInput, Typography, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  AnimatedTypography,
  MotionGrid,
  AnimatedButton,
} from "../components/FramerComponents";
import Api from "../Api";

export const SignupScreen = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    bio: "",
    social_links: {
      facebook: "",
      instagram: "",
    },
  };
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const isXs = useMediaQuery("(max-width:600px)"); // Extra small screens (phones)
  const isSm = useMediaQuery("(max-width:960px)"); // Small screens (tablets)
  const isMd = useMediaQuery("(max-width:1280px)"); // Medium screens (small laptops)
  const isLg = useMediaQuery("(max-width:1920px)");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState: any) => {
      const [field, nestedField] = name.split("."); // name = "social_link.facebook" ?, it splits into ["social_link","facebook"]
      // now field = social_link, nestedField = facebook

      if (nestedField) {
        return {
          ...prevState, // coping the state
          [field]: {
            //  from state we are spreaidng field like social_link
            ...prevState[field], // coping existing object like {facebook:"", instagram}
            [nestedField]: value, // now updating state like facebook = value from input.
          },
        };
      } else {
        return {
          ...prevState,
          [field]: value,
        };
      }
    });
  };

  const handleSubmit = async (e: any) => {
    if (
      user.username === "" ||
      user.email === "" ||
      user.password === "" ||
      user.bio === "" ||
      user.social_links.facebook === "" ||
      user.social_links.instagram === ""
    )
      return;
    const response = await Api.postData("/api/create-user", user);
    if (response) {
      console.log(response);
      setUser(initialState);
      navigate("/login");
    }
  };

  return (
    <MotionGrid style={mainContainer}>
      <MotionGrid
        sm={12}
        style={{
          width: isXs ? "80%" : isSm ? "50%" : isMd ? "35%" : "35%",
          height: isSm ? "45%" : isMd ? "45%" : "60%",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <MotionGrid display="flex" justifyContent="center" paddingTop="15px">
          <AnimatedTypography>TDM_Upload</AnimatedTypography>
        </MotionGrid>

        <MotionGrid
          padding="15px"
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          spacing={2}
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
            <Typography sx={{ width: "100%" }} textAlign="start">
              Username
            </Typography>

            <OutlinedInput
              fullWidth
              name="username"
              sx={{ minWidth: "220px" }}
              value={user.username}
              onChange={handleChange}
            />
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
            <Typography sx={{ width: "100%" }} textAlign="start">
              Email
            </Typography>

            <OutlinedInput
              fullWidth
              name="email"
              sx={{ minWidth: "220px" }}
              value={user.email}
              onChange={handleChange}
            />
          </MotionGrid>
        </MotionGrid>
        <MotionGrid
          padding="15px"
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          spacing={2}
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
            <Typography sx={{ width: "100%" }} textAlign="start">
              Password
            </Typography>

            <OutlinedInput
              fullWidth
              name="password"
              type="password"
              sx={{ minWidth: "220px" }}
              value={user.password}
              onChange={handleChange}
            />
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
            <Typography sx={{ width: "100%" }} textAlign="start">
              Bio
            </Typography>

            <OutlinedInput
              fullWidth
              name="bio"
              sx={{ minWidth: "220px" }}
              value={user.bio}
              onChange={handleChange}
            />
          </MotionGrid>
        </MotionGrid>

        <MotionGrid
          padding="15px"
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          spacing={2}
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
            <Typography sx={{ width: "100%" }} textAlign="start">
              Facebook Link
            </Typography>

            <OutlinedInput
              fullWidth
              name="social_links.facebook"
              sx={{ minWidth: "220px" }}
              value={user.social_links.facebook}
              onChange={handleChange}
            />
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
            <Typography sx={{ width: "100%" }} textAlign="start">
              Instagram Link
            </Typography>

            <OutlinedInput
              fullWidth
              name="social_links.instagram"
              sx={{ minWidth: "220px" }}
              value={user.social_links.instagram}
              onChange={handleChange}
            />
          </MotionGrid>
        </MotionGrid>
        <MotionGrid display="flex" justifyContent="center">
          <AnimatedButton
            variant="contained"
            ripple={false}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </AnimatedButton>
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
