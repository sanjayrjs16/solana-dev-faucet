import { Button, Input, VStack, useToast } from "@chakra-ui/react";
import React, { useState, ChangeEvent, useEffect } from "react";
import { PublicKey, Connection } from "@solana/web3.js";
import ReCAPTCHA from "react-google-recaptcha";

import SliderButton from "./SliderButton";
const Faucet = () => {
  const [address, setAddress] = useState<any>("");
  const [isTestNet, setIsTestNet] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isHuman, setIsHuman] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const validateSolanaAddress = (addrs: string) => {
    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(addrs);
      return PublicKey.isOnCurve(publicKey.toBytes());
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const requestAirdrop = async () => {
    try {
      const NODE_RPC = isTestNet
        ? "https://api.testnet.solana.com"
        : "https://api.devnet.solana.com";
      const CONNECTION = new Connection(NODE_RPC);
      setLoading(true);
      const confirmation = await CONNECTION.requestAirdrop(
        new PublicKey(address),
        1000000000
      );
      toast({
        position: "top",
        title: "Airdrop successful !",
        description: `Please check your wallet/solana explorer. Txn Hash:  ${confirmation}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      setAddress("");
    } catch (err) {
      console.error(err);
      toast({
        position: "top",
        title: "Airdrop failed !",
        description: `Something went wrong`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  function onChange(value: any) {
    console.log("Captcha value:", value);
    if (isValid) {
      setIsHuman(true);
    } else {
      setIsHuman(false);
    }
  }

  useEffect(() => {
    const isValid = validateSolanaAddress(address);
    setIsValid(isValid);
  }, [address]);

  return (
    <VStack>
      <SliderButton isTestNet={isTestNet} setIsTestNet={setIsTestNet} />
      <Input
        placeholder="Enter solana wallet address"
        value={address}
        size="lg"
        width={"lg"}
        textAlign="center"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAddress(e.target.value)
        }
        color={"blackAlpha.900"}
        backgroundColor="plum"
        _placeholder={{ color: "blackAlpha.700" }}
      />
      <ReCAPTCHA
        sitekey="6LceHC0fAAAAABFeERtSLI-CbUtWzhxlAk10S5OH"
        onChange={onChange}
      />
      ,
      <Button
        mt={20}
        disabled={!isHuman}
        onClick={requestAirdrop}
        isLoading={loading}
      >
        Request airdrop
      </Button>
    </VStack>
  );
};

export default Faucet;
