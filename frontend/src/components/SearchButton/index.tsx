import React from "react";
import { Grid, OutlinedInput, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface SearchInputProps {
  marginle?: number | string;
  inputWidth?: number | string;
}

export const SearchInput = (props: SearchInputProps) => {
  return (
    <Grid>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        sx={{
          display: "inline-block",
          borderStyle: "solid",
          borderWidth: "0.5px",
          borderColor: "#D8D9DA",
          padding: "5px",
          backgroundColor: "#45474B",
          borderRadius: "5px",
          marginLeft: props.marginle,
        }}
      >
        {/* <Box> */}
        <SearchIcon
          style={{
            color: "#ffffff",
            alignSelf: "end",
            paddingTop: "5px",
          }}
        />
        {/* </Box> */}
        <OutlinedInput
          placeholder="Search"
          sx={{
            // Remove the border
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "& .MuiInputBase-input": {
              color: "#ffffff",
            },
            height: "30px",
            width: props.inputWidth,
          }}
        />
      </Box>
    </Grid>
  );
};
