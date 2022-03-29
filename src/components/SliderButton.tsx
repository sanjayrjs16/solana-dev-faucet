import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import { Box, Button, ButtonGroup, Container, Slide } from "@chakra-ui/react";
const SliderButton = () => {
  const [isTestNet, setIsTestNet] = useState(false);
  return (
    <ButtonGroup
      style={{
        position: "relative",
        border: "2px solid black",
        borderRadius: "50px",
        overflow: "hidden",
      }}
    >
      <Button
        onClick={() => setIsTestNet(true)}
        style={
          isTestNet
            ? {
                border: "4px solid springgreen",
                transform: "scale(1.25)",
                backgroundColor: "springgreen",
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

                transform: "scale(1.25)",
                backgroundColor: "springgreen",
                color: "white",
              }
            : { border: "4px solid grey", backgroundColor: "GrayText" }
        }
      >
        {!isTestNet ? "✅" : ""} Devnet
      </Button>
    </ButtonGroup>
  );
};

export default SliderButton;
