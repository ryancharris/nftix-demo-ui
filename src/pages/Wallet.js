import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  CircularProgress,
  Flex,
  Image,
  Heading,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";

import logo from "../images/devdao.svg";

function Wallet({ address }) {
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    if (address) {
      setLoadingTickets(true);
      axios
        .get(
          `https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${process.env.REACT_APP_CONTRACT_ID}`
        )
        .then((res) => {
          if (res.status === 200 && res?.data?.assets) {
            setTickets(res.data.assets.reverse());
            console.log(res.data.assets.reverse());
          }

          setLoadingTickets(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingTickets(false);
        });
    }
  }, [address]);

  const creatNftPreviews = () => {
    if (tickets === null) return;

    return tickets.map((ticket) => {
      return (
        <Link
          href={ticket.permalink}
          key={ticket.id}
          isExternal
          flexBasis="160px"
          margin="16px 8px"
        >
          <Text fontSize="xl" mb={2}>
            NFTix #{ticket.token_id}
          </Text>
          <Box padding="12px" border="1px solid black" borderRadius="12px">
            <Image src={ticket.image_url} alt={`NFTix #${ticket.token_id}`} />
          </Box>
        </Link>
      );
    });
  };

  return (
    <VStack width="100%" padding="24px 12px">
      <Box margin="56px 0 16px 0" padding="0 16px" width="100%">
        <Image src={logo} alt="DevDAO logo" margin="0 auto 36px" width="25%" />
        <Heading mb={4}>Your tickets</Heading>
        {loadingTickets && (
          <Flex justifyContent="center" mb={8}>
            <CircularProgress
              capIsRound
              isIndeterminate
              color="green.300"
              size="120px"
            />
          </Flex>
        )}

        {!loadingTickets && tickets && !tickets.length && (
          <Text fontSize="xl" mb={8}>
            Sorry, you don't own any tickets 😕
          </Text>
        )}

        {!loadingTickets && tickets && tickets.length > 0 && (
          <Flex flexWrap="wrap" width="100%" justifyContent="space-evenly">
            {creatNftPreviews()}
          </Flex>
        )}
      </Box>
    </VStack>
  );
}

export default Wallet;
