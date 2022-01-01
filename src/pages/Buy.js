// import axios from "axios";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Box,
  Button,
  ButtonGroup,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import yourContract from "../contracts/YourContract.json";
import logo from "../images/devdao.svg";

function Buy({ address, connected }) {
  const toast = useToast();
  const [buyTxnPending, setBuyTxnPending] = useState(false);
  const [mintCount, setMintCount] = useState(1);

  const [loadingTotalTickets, setLoadingTotalTickets] = useState(false);
  const [totalTicketsAvailable, setTotalTicketsAvailable] = useState(null);

  const [loadingAvailableTickets, setLoadingAvailableTickets] = useState(false);
  const [availableTicketsAvailable, setAvailableTicketsAvailable] =
    useState(null);

  const getTotalTicketCount = async () => {
    const { ethereum } = window;

    if (!ethereum) return;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ID,
      yourContract.abi,
      signer
    );

    setLoadingTotalTickets(true);

    const res = await connectedContract.getTotalTicketCount();
    setTotalTicketsAvailable(res.toNumber());

    setLoadingTotalTickets(false);
  };

  const getAvailableTicketCount = async () => {
    const { ethereum } = window;

    if (!ethereum) return;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ID,
      yourContract.abi,
      signer
    );

    setLoadingAvailableTickets(true);

    const res = await connectedContract.getAvailableTicketCount();
    setAvailableTicketsAvailable(res.toNumber());

    setLoadingAvailableTickets(false);
  };

  useEffect(() => {
    if (connected && address) {
      getTotalTicketCount();
      getAvailableTicketCount();
    }
  }, [connected, address]);

  const buyTickets = async () => {
    console.log("Buy ticket...");
    try {
      if (!address || !connected) {
        console.log("You need to connect to buy a ticket...");
        return;
      }

      const { ethereum } = window;

      if (!ethereum) return;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ID,
        yourContract.abi,
        signer
      );

      setBuyTxnPending(true);
      const cost = 0.08 * mintCount;

      let nftTxn = await connectedContract.mint(mintCount, {
        value: `${cost * 10 ** 18}`,
      });

      await nftTxn.wait();
      setBuyTxnPending(false);

      // const desc = (
      //   <a href={`https://rinkeby.etherscan.io/tx/${nftTxn.hash}`}>
      //     Checkout the transaction on Etherscan
      //   </a>
      // );

      toast({
        title: "Success!",
        // description: `${desc}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
    } catch (error) {
      // toast({
      //   title: "Failed.",
      //   description: error,
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   variant: "subtle",
      // });
      console.log(error);
      setBuyTxnPending(false);
    }
  };

  return (
    <VStack width="100%" padding="24px 12px">
      <Box
        margin="56px 0 8px 0"
        width="100%"
        padding="0 16px"
        textAlign="center"
      >
        <Image src={logo} alt="DevDAO logo" margin="0 auto 36px" width="25%" />
        <Heading mb={4}>DevDAO Conference 2022</Heading>
        {!connected && (
          <Text fontSize="xl" mb={4}>
            Connect your wallet to mint your NFT. It'll be your ticket to get
            in!
          </Text>
        )}
        {connected && (
          <Text fontSize="xl" mb={6}>
            You're ready to go! Buy away 🚀
          </Text>
        )}
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="0 auto"
          maxW="140px"
        >
          <NumberInput
            size="lg"
            defaultValue={1}
            min={1}
            max={3}
            mb={4}
            onChange={(value) => {
              setMintCount(parseInt(value));
            }}
            isDisabled={!connected}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <ButtonGroup mb={4}>
            <Button
              isLoading={buyTxnPending}
              isDisabled={!connected}
              loadingText="Pending"
              size="lg"
              onClick={buyTickets}
              colorScheme="teal"
            >
              {mintCount > 1 ? "Buy Tickets" : "Buy Ticket"}
            </Button>
          </ButtonGroup>
          {availableTicketsAvailable &&
            totalTicketsAvailable &&
            !loadingTotalTickets &&
            !loadingAvailableTickets && (
              <Text>
                {totalTicketsAvailable - availableTicketsAvailable} of{" "}
                {totalTicketsAvailable} minted
              </Text>
            )}
        </Flex>
      </Box>
    </VStack>
  );
}

export default Buy;
