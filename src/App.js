import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

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

  return (
    <>
      <Connect />
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
              element={<Buy />}
            />

            <Route
              path="/check-in"
              element={<CheckIn />}
            />

            <Route
              path="/admin"
              element={<Admin />}
            />

            <Route
              path="/wallet"
              element={<Wallet />}
            />
          </Routes>
        </Flex>
      </Page>
    </>
  );
}

export default App;
