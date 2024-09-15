import { Typography } from "@mui/material";
import React, {
  useState,
  ReactNode,
  FC,
  useEffect,
  useRef,
  createRef,
} from "react";
import { Grid, SxProps } from "@mui/material";
import { Link } from "react-router-dom";
import { MotionGrid, AnimatedTypography } from "../FramerComponents";

export interface TypeWritterProps {
  speed: number;
  text: ReactNode;
  color?: string;
  backgroundGradient?: () => void;
  fontSize?: number;
  sx?: SxProps;
  highliterText?: string;
  highlighterSx?: SxProps;
  routeTo?: string;
  linkText?: string;
  linkFontColor?: string;
  linkStyleObj?: object;
}

export const TypeWritter: FC<TypeWritterProps> = ({
  speed,
  text,
  linkText,
  color,
  backgroundGradient,
  sx,
  routeTo,
  ...props
}) => {
  const [writtingText, setWrittingText] = useState("");
  const [writtingLinkText, setWrittingLinkText] = useState("");
  const [index, setIndex] = useState(0);
  const [linkIndex, setLinkIndex] = useState(0);

  //   useEffect(() => {
  //     if (typeof text === "string" && index < text.length) {
  //       const timeout = setTimeout(() => {
  //         setWrittingText((prev: string) => prev + text[index]);
  //         setIndex((prev: number) => prev + 1);
  //       }, speed);
  //       return () => clearTimeout(timeout);
  //     } else if (
  //       typeof linkText === "string" &&
  //       typeof text === "string" &&
  //       index === text.length &&
  //       linkIndex < linkText.length
  //     ) {
  //       const timeout = setTimeout(() => {
  //         setWrittingLinkText((prev: string) => {
  //           return linkText && prev + linkText[linkIndex];
  //         });
  //         setLinkIndex((prev: number) => prev + 1);
  //       }, speed);
  //       return () => clearTimeout(timeout);
  //     }
  //   }, [text, linkText, speed, index]);

  useEffect(() => {
    // Type the main text
    if (typeof text === "string" && index < text.length) {
      const timeout = setTimeout(() => {
        setWrittingText((prev: string) => prev + text[index]);
        setIndex((prev: number) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [text, index, speed]);

  useEffect(() => {
    // Type the link text after main text is finished
    if (
      typeof linkText === "string" &&
      typeof text === "string" &&
      index === text.length &&
      linkIndex < linkText.length
    ) {
      const timeout = setTimeout(() => {
        setWrittingLinkText((prev: string) => prev + linkText[linkIndex]);
        setLinkIndex((prev: number) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [linkText, linkIndex, index, text, speed]);

  return (
    <MotionGrid
      animate={{}}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        sx={{
          ...sx,
        }}
      >
        {writtingText}
        {typeof text === "string" && index === text.length && routeTo && (
          <Link to={routeTo} style={{ textDecoration: "none" }}>
            <AnimatedTypography
              whileHover={{ scale: 1.1 }}
              //   color={props.linkFontColor}
              sx={props.linkStyleObj}
              //   textAlign="center"
            >
              {writtingLinkText}
            </AnimatedTypography>
          </Link>
        )}
      </Typography>
    </MotionGrid>
  );
};
