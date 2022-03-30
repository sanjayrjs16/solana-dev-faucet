import { Button, Input, VStack, useToast } from "@chakra-ui/react";
import React, { useState, ChangeEvent, useEffect } from "react";
import { PublicKey, Connection } from "@solana/web3.js";
import SliderButton from "./SliderButton";
import ReCAPTCHA from "react-google-recaptcha";

const Faucet = () => {
  const [address, setAddress] = useState<any>("");
  const [isTestNet, setIsTestNet] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isHuman, setIsHuman] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();
  const siteKey: any = process.env.SITE_KEY;
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
  useEffect(() => {
    const isValid = validateSolanaAddress(address);
    setIsValid(isValid);
  }, [address]);

  //https://api.testnet.solana.com

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
      setAddress("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast({
        position: "top",
        title: "Airdrop failed!",
        description: `Something went wrong`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return false;
    }
  };

  function onChange(value: any) {
    console.log("Captcha value:", value);
    setIsHuman(true);
  }
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
      <ReCAPTCHA sitekey={siteKey} onChange={onChange} />
      <Button
        mt={20}
        disabled={!isValid || !isHuman}
        onClick={requestAirdrop}
        isLoading={loading}
      >
        Request airdrop
      </Button>
    </VStack>
  );
};

export default Faucet;
