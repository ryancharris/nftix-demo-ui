import { useState } from "react";
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

import logo from "../images/devdao.svg";

function Buy() {
  const [mintCount, setMintCount] =
    useState(1);

  return (
    <VStack
      width="100%"
      padding="24px 12px"
    >
      <Box
        margin="56px 0 8px 0"
        width="100%"
        padding="0 16px"
        textAlign="center"
      >
        <Image
          src={logo}
          alt="DevDAO logo"
          margin="0 auto 36px"
          width="25%"
        />
        <Heading mb={4}>
          DevDAO Conference 2022
        </Heading>
        <Text fontSize="xl" mb={4}>
          Connect your wallet to mint
          your NFT. It'll be your ticket
          to get in!
        </Text>
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
              setMintCount(
                parseInt(value)
              );
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <ButtonGroup mb={4}>
            <Button
              loadingText="Pending"
              size="lg"
              colorScheme="teal"
            >
              {mintCount > 1
                ? "Buy Tickets"
                : "Buy Ticket"}
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </VStack>
  );
}

export default Buy;
