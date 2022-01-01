import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  CloseButton,
  Image,
  CircularProgress,
} from "@chakra-ui/react";
import QrReader from "react-qr-scanner";
import { useToast } from "@chakra-ui/react";

import yourContract from "../contracts/YourContract.json";
import logo from "../images/devdao.svg";

function CheckIn({ connected, isOwner }) {
  const toast = useToast();
  const [scanned, setScanned] = useState(false);
  const [displayScanner, setDisplayScanner] = useState(false);
  const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false);
  const [displayFailureAlert, setDisplayFailureAlert] = useState(false);
  const [addressCaptured, setAddressCaptured] = useState(null);
  const [txnPending, setTxnPending] = useState(false);
  const [loadingHasTickets, setLoadingHasTickets] = useState(false);
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);

  console.log(`🤓 scanned: ${scanned}`);

  const [ticketIds, setTicketIds] = useState(null);
  console.log("ticketIds", ticketIds);

  useEffect(() => {
    if (addressCaptured && scanned) {
      checkOwnership();
      isCheckedIn();
    }
  }, [addressCaptured, scanned]);

  const checkOwnership = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ID,
        yourContract.abi,
        signer
      );

      setLoadingHasTickets(true);

      const res = await connectedContract.checkOwnership(addressCaptured);
      const ids = res.map((id) => id.toNumber());
      setTicketIds(ids);

      setLoadingHasTickets(false);
    } catch (error) {
      console.log(error);
      setLoadingHasTickets(false);
    }
  };

  const checkIn = async () => {
    console.log("Check in...");
    try {
      if (!addressCaptured || !connected) {
        console.log("You need to connect to check in...");
        return;
      }

      const { ethereum } = window;

      if (!ethereum) return;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ID,
        yourContract.abi,
        signer
      );

      setTxnPending(true);
      let nftTxn = await connectedContract.checkIn(addressCaptured);

      await nftTxn.wait();
      setTxnPending(false);

      toast({
        title: "Checked in!",
        description: () => {
          return (
            <a href={`https://rinkeby.etherscan.io/tx/${nftTxn.hash}`}>
              Checkout the transaction on Etherscan
            </a>
          );
        },
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
    } catch (error) {
      toast({
        title: "Failure",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
      });
      setTxnPending(false);
    }
  };

  const isCheckedIn = async () => {
    console.log("Looking up check-in status...");
    try {
      const { ethereum } = window;

      if (!ethereum) return;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ID,
        yourContract.abi,
        signer
      );

      let checkInStatus = await connectedContract.checkedIn();
      console.log("checkInStatus", checkInStatus);
      setAlreadyCheckedIn(checkInStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack width="100%" padding="24px 12px">
      <Box margin="56px 0 8px 0" padding="0 16px" width="100%">
        {displaySuccessAlert && (
          <Alert status="success" variant="left-accent" mb={4}>
            <AlertIcon />
            Successfully scanned address!
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setDisplaySuccessAlert(false)}
            />
          </Alert>
        )}

        {displayFailureAlert && (
          <Alert status="error" variant="left-accent" mb={4}>
            <AlertIcon />
            Failed to scan address.
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setDisplayFailureAlert(false)}
            />
          </Alert>
        )}

        {!scanned && !displayScanner && (
          <>
            <Image
              src={logo}
              alt="DevDAO logo"
              margin="0 auto 36px"
              width="25%"
            />
            <Heading mb={4}>Check In</Heading>
          </>
        )}

        {!scanned && !displayScanner && (
          <>
            <Text fontSize="xl" mb={8}>
              Scan wallet address to verify ticket ownership and check-in.
            </Text>
          </>
        )}

        {!scanned && !addressCaptured && !displayScanner && (
          <Flex width="100%" justifyContent="center">
            <Button
              isDisabled={!connected}
              loadingText="Pending"
              size="lg"
              onClick={() => {
                setDisplayScanner(true);
              }}
              colorScheme="teal"
            >
              Scan QR
            </Button>
          </Flex>
        )}

        {displayScanner && !addressCaptured && (
          <QrReader
            delay={3000}
            style={{
              maxWidth: "100%",
              margin: "0 auto",
            }}
            onError={(err) => {
              console.log("Cannot scan...");
              console.log(err);
              setScanned(false);
              setDisplayFailureAlert(true);
            }}
            onScan={(data) => {
              console.log("Successfully scanned!");
              console.log(data);
              if (!data) return;

              const address = data.text.split("ethereum:");
              setAddressCaptured(address[1]);
              setScanned(true);
              setDisplayScanner(false);
              setDisplaySuccessAlert(true);
            }}
          />
        )}

        {scanned && addressCaptured && (
          <>
            {ticketIds && ticketIds.length > 0 && !loadingHasTickets && (
              <Text fontSize="xl" mb={8}>
                This account owns {ticketIds.length} ticket(s).
              </Text>
            )}
            {(!ticketIds || ticketIds.length === 0) && !loadingHasTickets && (
              <Text fontSize="xl" mb={8}>
                This account does not own any tickets.
              </Text>
            )}
            {loadingHasTickets && (
              <Flex justifyContent="center" mb={8}>
                <CircularProgress
                  capIsRound
                  isIndeterminate
                  color="green.300"
                  size="120px"
                />
              </Flex>
            )}
            {!loadingHasTickets && (
              <Image
                src={logo}
                alt="DevDAO logo"
                margin="0 auto 36px"
                width="25%"
              />
            )}
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                isLoading={txnPending}
                isDisabled={
                  !connected ||
                  (ticketIds && !ticketIds.length) ||
                  alreadyCheckedIn
                }
                loadingText="Pending"
                size="lg"
                onClick={checkIn}
                colorScheme="teal"
                mb={4}
              >
                Check In
              </Button>
              {alreadyCheckedIn && <Text>Already checked in!</Text>}
            </Flex>
          </>
        )}
      </Box>
    </VStack>
  );
}

export default CheckIn;
