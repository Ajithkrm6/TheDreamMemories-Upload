import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Grid,
  OutlinedInput,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Api from "../Api";
import {
  MotionGrid,
  AnimatedButton,
  AnimatedTypography,
} from "../components/FramerComponents";

export const HomeScreen = () => {
  const [loader, setLoader] = useState(true);
  const [category, setCatory] = useState("Wedding");
  const [files, setFiles] = useState<FileList | null>(null);
  const [details, setDetails] = useState({
    description: "",
    client_name: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const isXs = useMediaQuery("(max-width:600px)"); // Extra small screens (phones)
  const isSm = useMediaQuery("(max-width:960px)"); // Small screens (tablets)
  const isMd = useMediaQuery("(max-width:1280px)"); // Medium screens (small laptops)
  const isLg = useMediaQuery("(max-width:1920px)");

  const catgoriesList = [
    "Wedding",
    "Children-photography",
    "Meternity-photography",
    "Parties",
  ];

  const handleDesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, client_name: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };
  const changeCategory = (e: any) => {
    setCatory(e.target.value);
  };

  const handleSubmit = async () => {
    if (!files) return;
    if (files) {
      console.log(category);

      let formData = new FormData();
      formData.append("category", category);
      Array.from(files).forEach((file) => {
        console.log("selected files : ", file);
        formData.append("images", file);
      });
      formData.append("description", details.description);
      formData.append("client_name", details.client_name);
      try {
        const response = await Api.postData(
          "/api/images/post-images",
          formData
        );
        console.log(response);
      } catch (err) {
        console.error("error fron home handle submit", err);
      }
    }
    console.log("hello");
    setFiles(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    const loaderState = setTimeout(() => {
      setLoader(!loader);
    }, 2000);
    return;
  }, []);

  useEffect(() => {
    console.log("Category updated:", category);
  }, [category]);

  return (
    <MotionGrid style={mainContainer} sm={12}>
      <MotionGrid
        sm={12}
        style={{
          padding: "15px",
          width: isXs ? "80%" : isSm ? "60%" : isMd ? "60%" : "45%",
          height: "auto",
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
              Category
            </Typography>

            <Select
              style={{ width: "100%", minWidth: "220px" }}
              value={category}
              onChange={changeCategory}
            >
              {catgoriesList.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
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
              Client Name
            </Typography>
            <OutlinedInput
              fullWidth
              sx={{ minWidth: "220px" }}
              value={details.client_name}
              onChange={handleClientChange}
            />
          </MotionGrid>
        </MotionGrid>
        <MotionGrid container display="flex" justifyContent="center">
          <MotionGrid item padding="15px" md={12} sm={12}>
            <OutlinedInput
              fullWidth
              sx={{
                padding: "10px",
                borderStyle: "dashed", // Set the dashed border
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "inherit", // Keep the original border color on hover
                  borderStyle: "dashed", // Ensure it stays dashed on hover
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderStyle: "dashed", // Ensure the default state is also dashed
                },
              }}
              type="file"
              onChange={handleFileChange}
              inputProps={{ multiple: true }}
              inputRef={inputRef}
            />
          </MotionGrid>
        </MotionGrid>
        <MotionGrid
          container
          padding="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <MotionGrid
            item
            sm={12}
            md={12}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
          >
            <Typography sx={{ width: "100%" }} textAlign="start">
              Description
            </Typography>
            <TextField
              fullWidth
              onChange={handleDesChange}
              multiline
              rows={3}
              sx={{
                "& .MuiInputBase-input": {
                  minWidth: isXs
                    ? "180px"
                    : isSm
                      ? "180px"
                      : isMd
                        ? "300px"
                        : "", // Set the height of the input element
                  padding: "0 14px", // Adjust padding to fit the height properly
                },
              }}
            />
          </MotionGrid>
        </MotionGrid>
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <AnimatedButton
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            whileTap={{ scale: 0.9 }}
          >
            Upload
          </AnimatedButton>
        </Grid>
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
  /* <Grid style={mainContainer}>
<Card
  sx={{
    height: "60%",
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  }}
>
  <CardContent
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      gap: "20px",
    }}
  >

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <Box>
          <Typography textAlign="center" variant="h5">
            TDM-Upload
          </Typography>
        </Box>
        <Grid
          gap="20px"
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box sx={{ width: "70%" }}>
            <Typography paddingBottom={"5px"}>Category</Typography>
            <Select
              style={{ width: "100%" }}
              value={category}
              onChange={changeCategory}
            >
              {catgoriesList.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Box sx={{ width: "70%" }}>
            <OutlinedInput
              // sx={{ width: "80%" }}
              type="file"
              onChange={handleFileChange}
              inputProps={{ multiple: true }}
              inputRef={inputRef}
            />
          </Box>
          <Box>
            <Button type="submit" onClick={handleSubmit}>
              Upload
            </Button>
          </Box>
        </Grid>
      </motion.div>

  </CardContent>
</Card>
</Grid> */
}
