import { useNavigate } from "react-router-dom";
import { Button, Box, Flex } from "@chakra-ui/react";

function Connect({ address, connected, onConnect, onDisconnect }) {
  const navigate = useNavigate();
  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Install MetaMask!");
      return;
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(`connected account: ${accounts[0]}`);

      onConnect(accounts[0]);
    } catch (error) {
      console.log(error);
      onConnect(null);
    }
  };

  const disconnectWallet = async () => {
    console.log("🦊 disconnecting metamask...");
    onDisconnect();
    navigate("/");
    console.log("🦊 disconnected!");
  };

  return (
    <Flex
      fontWeight="bold"
      position="absolute"
      top="8px"
      right="8px"
      zIndex="10"
    >
      {connected && (
        <Box
          bg="white"
          minW="120px"
          p="8px 16px"
          borderRadius="16px"
          textAlign="center"
          marginRight="16px"
        >
          <Button
            onClick={disconnectWallet}
            size="sm"
            variant="link"
            color="purple"
          >
            Disconnect
          </Button>
        </Box>
      )}
      <Box
        bg="white"
        minW="120px"
        p="8px 16px"
        borderRadius="16px"
        textAlign="center"
      >
        {!connected && (
          <Button
            onClick={connectWallet}
            size="sm"
            variant="link"
            color="purple"
          >
            Connect
          </Button>
        )}
        {connected && address && (
          <span>
            💳 {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        )}
      </Box>
    </Flex>
  );
}

export default Connect;
