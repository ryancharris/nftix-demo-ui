import { useState } from "react";
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
import { ethers } from "ethers";

import nfTixBooth from "../contracts/nfTixBooth.json";

import logo from "../images/devdao.svg";

function Admin({
  connectedContract,
  isOwner,
}) {
  const toast = useToast();
  const [
    openTxnPending,
    setOpenTxnPending,
  ] = useState(false);
  const [
    closeTxnPending,
    setCloseTxnPending,
  ] = useState(false);

  const closeSale = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return;

      const provider =
        new ethers.providers.Web3Provider(
          ethereum
        );
      const signer =
        provider.getSigner();
      const connectedContract =
        new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ID,
          nfTixBooth.abi,
          signer
        );

      setCloseTxnPending(true);
      let closeSaleTxn =
        await connectedContract.closeSale();

      await closeSaleTxn.wait();
      setCloseTxnPending(false);

      toast({
        title: "Sale is open!",
        description: (
          <a
            href={`https://rinkeby.etherscan.io/tx/${closeSaleTxn.hash}`}
            target="_blank"
            rel="nofollow noopener"
          >
            Checkout the transaction on
            Etherscan
          </a>
        ),
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
    } catch (err) {
      setCloseTxnPending(false);
      toast({
        title: "Failure",
        description: err,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
    }
  };

  const openSale = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return;

      const provider =
        new ethers.providers.Web3Provider(
          ethereum
        );
      const signer =
        provider.getSigner();
      const connectedContract =
        new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ID,
          nfTixBooth.abi,
          signer
        );

      setOpenTxnPending(true);
      let openSaleTxn =
        await connectedContract.openSale();

      await openSaleTxn.wait();
      setOpenTxnPending(false);

      toast({
        title: "Sale is open!",
        description: (
          <a
            href={`https://rinkeby.etherscan.io/tx/${openSaleTxn.hash}`}
            target="_blank"
            rel="nofollow noopener"
          >
            Checkout the transaction on
            Etherscan
          </a>
        ),
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
    } catch (err) {
      setOpenTxnPending(false);
      toast({
        title: "Failure",
        description: err,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
    }
  };

  return (
    <VStack
      width="100%"
      padding="24px 12px"
    >
      <Box
        margin="56px 0 16px 0"
        padding="0 16px"
        width="100%"
      >
        <Image
          src={logo}
          alt="DevDAO logo"
          margin="0 auto 36px"
          width="25%"
        />
        <Heading mb={4}>
          Admin panel
        </Heading>
        <Text fontSize="xl" mb={8}>
          Enable and disable sales on
          the smart contract.
        </Text>
        <Flex
          width="100%"
          justifyContent="center"
        >
          <Button
            isDisabled={
              !isOwner ||
              closeTxnPending
            }
            isLoading={openTxnPending}
            onClick={openSale}
            loadingText="Pending"
            size="lg"
            colorScheme="teal"
          >
            Open Sale
          </Button>
          <Button
            isDisabled={
              !isOwner || openTxnPending
            }
            isLoading={closeTxnPending}
            onClick={closeSale}
            loadingText="Pending"
            size="lg"
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
