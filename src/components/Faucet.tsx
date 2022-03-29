import { Button, Input, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PublicKey, Connection } from "@solana/web3.js";

const Faucet = () => {
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);

  const validateSolanaAddress = async (addr: string) => {
    let publicKey;
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

  const requestAirDrop = async (addrs: string) => {};
  return (
    <VStack>
      <Input
        placeholder="Enter solana wallet address"
        value={address}
        size="lg"
        width={"lg"}
        textAlign="center"
        onChange={(e: any) => setAddress(e.target.value)}
        color={"black"}
      />
      <Button
        onClick={() => requestAirDrop(address)}
        disabled={!isValidAddress}
      >
        Request airdrop
      </Button>
    </VStack>
  );
};

export default Faucet;
