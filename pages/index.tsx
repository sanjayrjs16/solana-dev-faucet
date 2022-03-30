import { Text, Heading, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Faucet from "../src/components/Faucet";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Solana dev faucet</title>
        <meta
          name="description"
          content="A faucet for solana tokens on dev net"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <VStack mb={10}>
          <Heading as="h1" size={"2xl"}>
            ✨{" "}
            <span className={styles.animateCharcter}>
              ☉ The Stardust faucet ☉{" "}
            </span>
            ✨
          </Heading>
          <Text color={"whiteAlpha.800"} fontSize="2xl">
            Thirsty from all that glass chewing ?
          </Text>
          <Text color={"whiteAlpha.800"} fontSize="xl">
            Use this faucet airdrop yourself ☉
          </Text>
          <Heading
            as="h2"
            size={"md"}
            textAlign={"center"}
            color={"ButtonFace"}
          ></Heading>
        </VStack>
        <Faucet />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
