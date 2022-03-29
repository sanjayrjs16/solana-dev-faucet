import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import { Box, Button, ButtonGroup, Container, Slide } from "@chakra-ui/react";

interface SliderButtonProps {
  isTestNet: boolean;
  setIsTestNet: Function;
}
const SliderButton = ({ isTestNet, setIsTestNet }: SliderButtonProps) => {
  return (
    <div
      style={{
        position: "relative",
        // border: "2px solid black",
        borderRadius: "50px",
        overflow: "hidden",
        backgroundColor: "GrayText",
      }}
    >
      <Button
        onClick={() => setIsTestNet(true)}
        style={
          isTestNet
            ? {
                border: "4px solid springgreen",
                // transform: "scale(1.25)",
                backgroundColor: "springgreen",
                borderRadius: "50rem",
              }
            : { border: "4px solid grey", backgroundColor: "grey" }
        }
      >
        {isTestNet ? "✅" : ""} Testnet
      </Button>

      <Button
        onClick={() => setIsTestNet(false)}
        style={
          !isTestNet
            ? {
                border: "4px solid springgreen",

                // transform: "scale(1.25)",
                backgroundColor: "springgreen",
                borderRadius: "50rem",
              }
            : { border: "4px solid grey", backgroundColor: "GrayText" }
        }
      >
        {!isTestNet ? "✅" : ""} Devnet
      </Button>
    </div>
  );
};

export default SliderButton;
