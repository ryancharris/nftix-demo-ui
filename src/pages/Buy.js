import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";

function Buy() {
  return (
    <>
      <Heading mb={4}>
        DevDAO Conference 2022
      </Heading>
      <Text fontSize="xl" mb={4}>
        Connect your wallet to mint your
        NFT. It'll be your ticket to get
        in!
      </Text>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="0 auto"
        maxW="140px"
      >
        <ButtonGroup mb={4}>
          <Button
            loadingText="Pending"
            size="lg"
            colorScheme="teal"
          >
            Buy Ticket
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
}

export default Buy;
