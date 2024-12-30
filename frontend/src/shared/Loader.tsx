import { Box, CircularProgress } from "@mui/material";
import { useAppStore } from "@stores/zustandStore";
import React from "react";

const Loader: React.FC = () => {
  const { isLoading } = useAppStore((state) => state);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <GradientCircularProgress />
    </Box>
  );
};

const GradientCircularProgress = () => {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id='my_gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#FF5722' />
            <stop offset='100%' stopColor='#388E3C' />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{
          "svg circle": { stroke: "url(#my_gradient)" },
        }}
      />
    </React.Fragment>
  );
};

export default Loader;
