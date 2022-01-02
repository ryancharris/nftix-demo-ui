import {
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

function Wallet() {
  return (
    <>
      <Heading mb={4}>
        Your ticket
      </Heading>
      <Flex
        justifyContent="center"
        mb={8}
      >
        <Text
          fontSize="xl"
          mb={2}
          width="100%"
        >
          You don't own any tickets 😢
        </Text>
      </Flex>
    </>
  );
}

export default Wallet;
