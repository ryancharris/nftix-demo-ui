import {
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";

function Connect() {
  return (
    <Flex
      fontWeight="bold"
      position="absolute"
      top="8px"
      right="8px"
      zIndex="10"
    >
      <Box
        bg="white"
        minW="120px"
        p="8px 16px"
        borderRadius="16px"
        textAlign="center"
      >
        <Button
          size="sm"
          variant="link"
          color="purple"
        >
          Connect
        </Button>
      </Box>
    </Flex>
  );
}

export default Connect;
