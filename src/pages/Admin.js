import {
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

function Admin() {
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
          size="lg"
          colorScheme="teal"
        >
          Open Sale
        </Button>
        <Button
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
