import {
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

function CheckIn() {
  return (
    <>
      <Heading mb={4}>Check In</Heading>
      <Text fontSize="xl" mb={8}>
        Scan wallet address to verify
        ticket ownership and check-in.
      </Text>
      <Flex
        width="100%"
        justifyContent="center"
      >
        <Button
          size="lg"
          colorScheme="teal"
        >
          Scan QR
        </Button>
      </Flex>
    </>
  );
}

export default CheckIn;
