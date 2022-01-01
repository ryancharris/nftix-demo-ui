import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import Admin from "./pages/Admin";
import Buy from "./pages/Buy";
import CheckIn from "./pages/CheckIn";
import Page from "./layouts/Page";
import Wallet from "./pages/Wallet";

import yourContract from "./contracts/YourContract.json";

function App() {
  const [connected, setConnected] = useState(false);
  console.log(`🔌 connected: ${connected}`);
  const [address, setAddress] = useState(null);
  console.log(`🏦 address: ${address}`);
  const [isOwner, setIsOwner] = useState(false);
  console.log(`🧐 isOwner: ${isOwner}`);

  let navigate = useNavigate();

  useEffect(() => {
    if (!connected || !address) {
      const prevAddress = window.localStorage.getItem("nftix-address");

      if (prevAddress) {
        setConnected(true);
        setAddress(prevAddress);
      }
    }
  }, [address, connected]);

  useEffect(() => {
    if (!connected || !address) {
      return;
    }

    getOwnerAddress();
  }, [connected, address]);

  const getOwnerAddress = async () => {
    console.log("Getting owner address...");

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

      const owner = await connectedContract.owner();

      if (address === owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Connect
        address={address}
        connected={connected}
        onConnect={(address) => {
          if (!address) {
            console.log("Failed to connect!");
            return;
          }

          setAddress(address);
          setConnected(true);
          window.localStorage.setItem("nftix-address", address);
        }}
        onDisconnect={() => {
          setAddress(null);
          setConnected(false);
          setIsOwner(false);
          window.localStorage.removeItem("nftix-address");
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
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate("/")}>
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Buy
                    <FontAwesomeIcon icon={faEthereum} size="lg" />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => navigate("/wallet")}
                  isDisabled={!connected}
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Your Tickets
                    <FontAwesomeIcon icon={faTicketAlt} size="lg" />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => navigate("/check-in")}
                  isDisabled={!isOwner}
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Check In
                    <FontAwesomeIcon icon={faQrcode} size="lg" />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => navigate("/admin")}
                  isDisabled={!isOwner}
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Settings
                    <FontAwesomeIcon icon={faTools} size="lg" />
                  </Flex>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
        <Flex
          alignItems="flex-start"
          flex="1 1 auto"
          justifyContent="center"
          width="100%"
        >
          <Routes>
            <Route
              path="/"
              element={<Buy address={address} connected={connected} />}
            />

            <Route
              path="/check-in"
              element={<CheckIn connected={connected} isOwner={isOwner} />}
            />

            <Route
              path="/admin"
              element={
                <Admin
                  address={address}
                  connected={connected}
                  isOwner={isOwner}
                />
              }
            />

            <Route path="/wallet" element={<Wallet address={address} />} />
          </Routes>
        </Flex>
      </Page>
    </>
  );
}

export default App;
