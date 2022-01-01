import {
  Box,
  CircularProgress,
  Flex,
  Image,
  Heading,
  VStack,
} from "@chakra-ui/react";

import logo from "../images/devdao.svg";

function Wallet() {
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
          Your tickets
        </Heading>
        <Flex
          justifyContent="center"
          mb={8}
        >
          <CircularProgress
            capIsRound
            isIndeterminate
            color="green.300"
            size="120px"
          />
        </Flex>
      </Box>
    </VStack>
  );
}

export default Wallet;
