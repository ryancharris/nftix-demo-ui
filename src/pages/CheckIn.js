import {
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import QrReader from "react-qr-scanner";

import logo from "../images/devdao.svg";

function CheckIn({
  connectedContract,
}) {
  const toast = useToast();

  const [showScanner, setShowScanner] =
    useState(false);

  const [
    scannedAddress,
    setScannedAddress,
  ] = useState(null);

  const [
    addressHasTicket,
    setAddressHasTicket,
  ] = useState(false);

  const [
    checkInTxnPending,
    setCheckInTxnPending,
  ] = useState(false);

  useEffect(() => {
    if (scannedAddress) {
      confirmOwnership();
    }
  }, [scannedAddress]);

  const confirmOwnership = async () => {
    try {
      if (!connectedContract) return;

      const res =
        await connectedContract.confirmOwnership(
          scannedAddress
        );

      setAddressHasTicket(res);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIn = async () => {
    try {
      if (!connectedContract) return;

      setCheckInTxnPending(true);
      const checkInTxn =
        await connectedContract.checkIn(
          scannedAddress
        );

      await checkInTxn.wait();
      setCheckInTxnPending(false);
      toast({
        title: "Checked in!",
        description: (
          <a
            href={`https://rinkeby.etherscan.io/tx/${checkInTxn.hash}`}
            target="_blank"
            rel="nofollow noopener"
          >
            Checkout the transaction on
            Etherscan
          </a>
        ),
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
    } catch (err) {
      console.log(err);
      setCheckInTxnPending(false);
      toast({
        title: "Failure",
        description: err,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
    }
  };

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

        {!showScanner &&
          scannedAddress &&
          addressHasTicket && (
            <>
              <Text
                fontSize="xl"
                mb={8}
              >
                This wallet owns a
                ticket to the
                conference!
              </Text>
              <Flex
                width="100%"
                justifyContent="center"
              >
                <Button
                  onClick={checkIn}
                  isLoading={
                    checkInTxnPending
                  }
                  size="lg"
                  colorScheme="teal"
                >
                  Check In
                </Button>
              </Flex>
            </>
          )}

        {!showScanner && (
          <>
            {!scannedAddress && (
              <Text
                fontSize="xl"
                mb={8}
              >
                Scan wallet address to
                verify ticket ownership
                and check-in.
              </Text>
            )}
            {scannedAddress &&
              !addressHasTicket && (
                <Text
                  fontSize="xl"
                  mb={8}
                >
                  This wallet does not
                  own a ticket. Please
                  try again.
                </Text>
              )}
            {!addressHasTicket && (
              <Flex
                width="100%"
                justifyContent="center"
              >
                <Button
                  onClick={() =>
                    setShowScanner(true)
                  }
                  size="lg"
                  colorScheme="teal"
                >
                  Scan QR
                </Button>
              </Flex>
            )}
          </>
        )}

        {showScanner && (
          <>
            <Box
              margin="16px 0 8px 0"
              padding="0 16px"
              width="100%"
            >
              <QrReader
                delay={3000}
                style={{
                  maxWidth: "100%",
                  margin: "0 auto",
                }}
                onError={(err) => {
                  console.log(err);
                  setShowScanner(false);
                  toast({
                    title: "Failure",
                    description: err,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    variant: "subtle",
                  });
                }}
                onScan={(data) => {
                  if (!data) return;

                  const address =
                    data.text.split(
                      "ethereum:"
                    );
                  setScannedAddress(
                    address[1]
                  );
                  setShowScanner(false);
                  toast({
                    title:
                      "Captured address!",
                    description: `${address[1].slice(
                      0,
                      6
                    )}
                    ...${address[1].slice(
                      -4
                    )}`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    variant: "subtle",
                  });
                }}
              />
            </Box>
            <Flex
              width="100%"
              justifyContent="center"
            >
              <Button
                onClick={() =>
                  setShowScanner(false)
                }
                size="lg"
                colorScheme="red"
              >
                Cancel
              </Button>
            </Flex>
          </>
        )}
      </Box>
    </VStack>
  );
}

export default CheckIn;
