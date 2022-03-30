import { Button, Input, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState, ChangeEvent } from "react";
import { PublicKey, Connection } from "@solana/web3.js";
import SliderButton from "./SliderButton";

const Faucet = () => {
  const [address, setAddress] = useState<any>("");
  const [isValid, setisValid] = useState<boolean>(false);
  const [isTestNet, setIsTestNet] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const validateSolanaAddress = (addr: string) => {
    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(addr);
      return PublicKey.isOnCurve(publicKey.toBytes());
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const isValid = validateSolanaAddress(address);
    setisValid(isValid);
  }, [address]);

  const requestAirDrop = async () => {
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
      setLoading(false);
      toast({
        position: "top",
        title: "Airdrop succesful",
        description: `Txn Hash ${confirmation}. Please check your wallet and SolScan`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setAddress("");
    } catch (err) {
      console.log("Error: ", err);
      setLoading(false);
      toast({
        position: "top",
        title: "Airdrop failed",
        description: "Something went wrong.",
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAddress(e.target.value)
        }
        color={"blackAlpha.900"}
        backgroundColor="plum"
        _placeholder={{ color: "blackAlpha.700" }}
      />
      <Button
        mt={20}
        onClick={requestAirDrop}
        disabled={!isValid}
        isLoading={loading}
      >
        Request airdrop
      </Button>
    </VStack>
  );
};

export default Faucet;
