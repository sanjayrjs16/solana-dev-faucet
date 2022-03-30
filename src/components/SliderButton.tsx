import React from "react";
import { Button } from "@chakra-ui/react";

interface SliderButtonProps {
  isTestNet: boolean;
  setIsTestNet: Function;
}
const activeBtn = {
  border: "4px solid springgreen",
  backgroundColor: "springgreen",
  borderRadius: "50rem",
};
const inActiveBtn = { border: "4px solid grey", backgroundColor: "grey" };

const SliderButton = ({ isTestNet, setIsTestNet }: SliderButtonProps) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "50px",
        overflow: "hidden",
        backgroundColor: "GrayText",
        marginBottom: "40px",
      }}
    >
      <Button
        onClick={() => setIsTestNet(true)}
        style={isTestNet ? activeBtn : inActiveBtn}
      >
        {isTestNet ? "✅" : ""} Testnet
      </Button>

      <Button
        onClick={() => setIsTestNet(false)}
        style={!isTestNet ? activeBtn : inActiveBtn}
      >
        {!isTestNet ? "✅" : ""} Devnet
      </Button>
    </div>
  );
};

export default SliderButton;
