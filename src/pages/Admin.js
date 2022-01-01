import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import logo from "../images/devdao.svg";

function Admin() {
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
            loadingText="Pending"
            size="lg"
            colorScheme="teal"
          >
            Open Sale
          </Button>
          <Button
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
