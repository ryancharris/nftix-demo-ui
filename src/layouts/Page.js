import {
  Box,
  Container,
  Flex,
  VStack,
} from "@chakra-ui/react";

function Page({ children }) {
  return (
    <Flex
      align="center"
      bgImage="linear-gradient(
        rgba(216, 202, 232, 0.35),
        rgba(214, 22, 17, 0.50)
      ),
      url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80')"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="right top"
      direction="column"
      grow="1"
      minH="100vh"
      justify="center"
      position="relative"
      padding="0 12px"
    >
      <Container
        maxW="container.sm"
        centerContent={true}
        border="1px solid black"
        bg="white"
        borderRadius="24px"
        minH="66vh"
        margin="12px 12px"
        position="relative"
      >
        <VStack
          w="100%"
          flex="1 1 auto"
        >
          <VStack
            width="100%"
            padding="24px 12px"
          >
            <Box
              margin="0 0 16px 0"
              padding="0 16px"
              width="100%"
            >
              {children}
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Flex>
  );
}

export default Page;
