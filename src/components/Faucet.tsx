import { Button, Input, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PublicKey, Connection } from "@solana/web3.js";
import SliderButton from "./SliderButton";

const Faucet = () => {
  const [address, setAddress] = useState<any>("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isTestNet, setIsTestNet] = useState(false);
  const toast = useToast();
  const validateSolanaAddress = async (addr: string) => {
    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(addr);
      return await PublicKey.isOnCurve(publicKey.toBytes());
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const checkAddressValid = async () => {
      const isValid = await validateSolanaAddress(address);
      setIsValidAddress(isValid);
    };
    checkAddressValid();
  }, [address]);

  const requestAirDrop = async () => {
    try {
      const NODE_RPC = isTestNet
        ? "https://api.testnet.solana.com"
        : "https://api.devnet.solana.com"; // devnet environment
      console.log("The node rpc is ", NODE_RPC);
      const CONNECTION = new Connection(NODE_RPC);
      console.log(
        "Calling request airdrop to address",
        address,
        NODE_RPC,
        new PublicKey(address)
      );
      const confirmation = await CONNECTION.requestAirdrop(
        new PublicKey(address),
        1000000000
      );
      alert(confirmation);
      toast({
        position: "top",
        title: "Airdrop succesful",
        description: "Please check your wallet",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log("Error: ", err);
      toast({
        position: "top",
        title: "Airdrop failed",
        description: "Something went wrong  ",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <VStack>
      <SliderButton isTestNet={isTestNet} setIsTestNet={setIsTestNet} />
      <Input
        placeholder="Enter solana wallet address"
        value={address}
        size="lg"
        width={"lg"}
        textAlign="center"
        onChange={(e: any) => setAddress(e.target.value)}
        color={"black"}
      />
      <Button onClick={() => requestAirDrop()} disabled={!isValidAddress}>
        Request airdrop
      </Button>
    </VStack>
  );
};

export default Faucet;
