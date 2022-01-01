import { useState } from "react";
import { ethers } from "ethers";
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import yourContract from "../contracts/YourContract.json";
import logo from "../images/devdao.svg";

function Admin({ address, connected, isOwner }) {
  const toast = useToast();
  const [openTxnPending, setOpenTxnPending] = useState(false);
  const [closeTxnPending, setCloseTxnPending] = useState(false);

  const openSale = async () => {
    console.log("Open sale...");
    try {
      if (!address || !connected || !isOwner) {
        console.log("You cannot open the sale...");
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

      setOpenTxnPending(true);
      let nftTxn = await connectedContract.openSale();

      await nftTxn.wait();
      setOpenTxnPending(false);

      toast({
        title: "Sale is open!",
        description: () => {
          return (
            <a href={`https://rinkeby.etherscan.io/tx/${nftTxn.hash}`}>
              Checkout the transaction on Etherscan
            </a>
          );
        },
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
    } catch (error) {
      toast({
        title: "Failure",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
      setOpenTxnPending(false);
    }
  };

  const closeSale = async () => {
    console.log("Close sale...");
    try {
      if (!address || !connected || !isOwner) {
        console.log("You cannot close the sale...");
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

      setCloseTxnPending(true);
      let nftTxn = await connectedContract.closeSale();

      await nftTxn.wait();
      setCloseTxnPending(false);

      toast({
        title: "Sale is closed!",
        description: () => {
          return (
            <a href={`https://rinkeby.etherscan.io/tx/${nftTxn.hash}`}>
              Checkout the transaction on Etherscan
            </a>
          );
        },
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
    } catch (error) {
      toast({
        title: "Failure",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
      setCloseTxnPending(false);
    }
  };

  return (
    <VStack width="100%" padding="24px 12px">
      <Box margin="56px 0 16px 0" padding="0 16px" width="100%">
        <Image src={logo} alt="DevDAO logo" margin="0 auto 36px" width="25%" />
        <Heading mb={4}>Admin panel</Heading>
        <Text fontSize="xl" mb={8}>
          Enable and disable sales on the smart contract.
        </Text>
        <Flex width="100%" justifyContent="center">
          <Button
            isLoading={openTxnPending}
            isDisabled={!connected}
            loadingText="Pending"
            size="lg"
            onClick={openSale}
            colorScheme="teal"
          >
            Open Sale
          </Button>
          <Button
            isLoading={closeTxnPending}
            isDisabled={!connected}
            loadingText="Pending"
            size="lg"
            onClick={closeSale}
            colorScheme="red"
            variant="solid"
            marginLeft="24px"
          >
            Close Sale
          </Button>
        </Flex>
      </Box>
    </VStack>
  );
}

export default Admin;
