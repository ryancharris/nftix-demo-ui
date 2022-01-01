import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";

import logo from "../images/devdao.svg";

function CheckIn() {
  const [scanned, setScanned] =
    useState(false);
  console.log(`🤓 scanned: ${scanned}`);

  return (
    <VStack
      width="100%"
      padding="24px 12px"
    >
      <Box
        margin="56px 0 8px 0"
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
          Check In
        </Heading>

        <>
          <Text fontSize="xl" mb={8}>
            Scan wallet address to
            verify ticket ownership and
            check-in.
          </Text>
        </>

        <Flex
          width="100%"
          justifyContent="center"
        >
          <Button
            loadingText="Pending"
            size="lg"
            colorScheme="teal"
          >
            Scan QR
          </Button>
        </Flex>
      </Box>
    </VStack>
  );
}

export default CheckIn;
