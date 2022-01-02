import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

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
      if (!connectedContract) return;

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
      if (!connectedContract) return;

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
    <>
      <Heading mb={4}>
        Admin panel
      </Heading>
      <Text fontSize="xl" mb={8}>
        Enable and disable sales on the
        smart contract.
      </Text>
      <Flex
        width="100%"
        justifyContent="center"
      >
        <Button
          isDisabled={
            !isOwner || closeTxnPending
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
    </>
  );
}

export default Admin;
