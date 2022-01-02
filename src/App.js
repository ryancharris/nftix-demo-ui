import React, {
  useEffect,
  useState,
} from "react";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ethers } from "ethers";

import nfTixBooth from "./contracts/nfTixBooth.json";
import logo from "./images/devdao.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import {
  faQrcode,
  faTools,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";

import Connect from "./components/Connect";
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";

import Admin from "./pages/Admin";
import Buy from "./pages/Buy";
import CheckIn from "./pages/CheckIn";
import Page from "./layouts/Page";
import Wallet from "./pages/Wallet";

function App() {
  const navigate = useNavigate();
  const [
    connectedContract,
    setConnectedContract,
  ] = useState(null);
  console.log(
    "📄 connectedContract:",
    connectedContract
  );

  const [address, setAddress] =
    useState(null);
  const [isOwner, setIsOwner] =
    useState(false);

  useEffect(() => {
    // Debug logs
    console.log(
      `🏦 address: ${address}`
    );
    console.log(
      `🧐 isOwner: ${isOwner}`
    );
  }, [address, isOwner]);

  useEffect(() => {
    if (!address) {
      const previousAddress =
        window.localStorage.getItem(
          "nftix-address"
        );

      if (previousAddress) {
        setAddress(previousAddress);
      }
    }
  }, [address]);

  const getConnectedContract =
    async () => {
      const { ethereum } = window;
      if (!ethereum) {
        return;
      } else if (
        !process.env
          .REACT_APP_CONTRACT_ID
      ) {
        console.log(
          "Set'process.env.REACT_APP_CONTRACT_ID'"
        );
      }

      const provider =
        new ethers.providers.Web3Provider(
          ethereum
        );
      const signer =
        provider.getSigner();
      const connectedContract =
        new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ID,
          nfTixBooth.abi,
          signer
        );
      setConnectedContract(
        connectedContract
      );
    };

  useEffect(() => {
    getConnectedContract();
  }, []);

  const checkIsContractOwner =
    async () => {
      if (
        !connectedContract ||
        !address
      )
        return;

      const ownerAddress =
        await connectedContract.owner();

      if (
        address.toLowerCase() ===
        ownerAddress.toLowerCase()
      ) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    };

  useEffect(() => {
    checkIsContractOwner();
  }, [address]);

  return (
    <>
      <Connect
        address={address}
        onConnect={(address) => {
          if (!address) return;

          setAddress(address);
          window.localStorage.setItem(
            "nftix-address",
            address
          );
        }}
        onDisconnect={() => {
          setAddress(null);
          window.localStorage.removeItem(
            "nftix-address"
          );
        }}
      />
      <Page>
        <Menu
          left="0"
          _hover={{
            bg: "purple.500",
            fontWeight: "bold",
          }}
        >
          {({ isOpen }) => (
            <>
              <MenuButton
                position="absolute"
                top="12px"
                right="16px"
                as={Button}
                colorScheme="purple"
                rightIcon={
                  isOpen ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )
                }
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    navigate("/")
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Buy
                    <FontAwesomeIcon
                      icon={faEthereum}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() =>
                    navigate("/wallet")
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Your Tickets
                    <FontAwesomeIcon
                      icon={faTicketAlt}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  isDisabled={!isOwner}
                  onClick={() =>
                    navigate(
                      "/check-in"
                    )
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Check In
                    <FontAwesomeIcon
                      icon={faQrcode}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  isDisabled={!isOwner}
                  onClick={() =>
                    navigate("/admin")
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Settings
                    <FontAwesomeIcon
                      icon={faTools}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
        <Flex
          alignItems="flex-start"
          flex="1 1 auto"
          flexDirection="column"
          justifyContent="center"
          width="100%"
        >
          <Image
            src={logo}
            alt="DevDAO logo"
            margin="36px auto 12px"
            width="15%"
          />
          <Routes>
            <Route
              path="/"
              element={
                <Buy
                  connectedContract={
                    connectedContract
                  }
                />
              }
            />

            <Route
              path="/check-in"
              element={
                <CheckIn
                  connectedContract={
                    connectedContract
                  }
                />
              }
            />

            <Route
              path="/admin"
              element={
                <Admin
                  connectedContract={
                    connectedContract
                  }
                  isOwner={isOwner}
                />
              }
            />

            <Route
              path="/wallet"
              element={
                <Wallet
                  address={address}
                />
              }
            />
          </Routes>
        </Flex>
      </Page>
    </>
  );
}

export default App;
