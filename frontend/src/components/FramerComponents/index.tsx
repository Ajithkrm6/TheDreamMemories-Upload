import React from "react";
import { motion } from "framer-motion";
import { Grid, Button, Typography } from "@mui/material";
import { GridProps } from "@mui/material";
import { forwardRef } from "react";

export const MotionGrid = motion(
  forwardRef<HTMLDivElement, GridProps>(function GridMotion(props, ref) {
    return <Grid {...props} ref={ref} />;
  })
);

const ForwardedButton = forwardRef<HTMLButtonElement, any>((props, ref) => (
  <Button {...props} ref={ref} />
));

export const AnimatedButton = motion(ForwardedButton);

const ForwardedTypography = forwardRef<HTMLSpanElement, any>((props, ref) => {
  return <Typography {...props} ref={ref} />;
});

export const AnimatedTypography = motion(ForwardedTypography);

export const AnimatedGrid = () => {
  return (
    <MotionGrid
      container
      height="300px"
      width="300px"
      bgcolor="red"
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
    >
      <MotionGrid
        bgcolor="blue"
        item
        height="100px"
        width="100px"
        whileHover={{ scale: 1.2, rotate: 90, transition: { duration: 0.7 } }}
        whileTap={{ scale: 0.9 }}
      ></MotionGrid>

      <AnimatedButton type="text" whileTap={{ scale: 0.9 }}></AnimatedButton>
    </MotionGrid>
  );
};
