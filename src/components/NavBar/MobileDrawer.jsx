import {
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  VStack,
  DrawerFooter,
  Divider,
  Tooltip,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { MdMenu, MdChat, MdDashboard, MdHome, MdAdd } from 'react-icons/md';

import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function MobileDrawer() {
  const { pathname } = useLocation();
  const auth = useAuth();
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function renderAddListingBtn() {
    if (pathname === '/' || pathname === '/dashboard') {
      return (
        <RouterLink to="/add-listing">
          <IconButton
            isRound
            position="fixed"
            bottom="20px"
            right="20px"
            icon={<MdAdd />}
            bg="teal.400"
            size="lg"
            variant="solid"
            color="white"
            display={{ sm: 'flex', md: 'none' }}
          />
        </RouterLink>
      );
    }
  }

  return (
    <>
      <Flex display={{ sm: 'flex', md: 'none' }}>
        <Button ref={btnRef} onClick={onOpen}>
          <MdMenu size="26px" />
        </Button>
        <Drawer
          bg="#FED811"
          finalFocusRef={btnRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>OpenJio</DrawerHeader>
            <DrawerBody>
              <VStack>
                <RouterLink to="/">
                  <Button
                    onClick={onClose}
                    w="60vw"
                    color="white"
                    bg="teal.400"
                    leftIcon={<MdHome />}
                  >
                    Home
                  </Button>
                </RouterLink>
                <RouterLink to="/dashboard">
                  <Button
                    onClick={onClose}
                    w="60vw"
                    color="white"
                    bg="teal.400"
                    leftIcon={<MdDashboard />}
                  >
                    Dashboard
                  </Button>
                </RouterLink>

                <RouterLink to="/chat">
                  <Tooltip
                    hasArrow
                    label="Please view on desktop."
                    shouldWrapChildren
                  >
                    <Button
                      onClick={onClose}
                      w="60vw"
                      color="white"
                      bg="teal.400"
                      leftIcon={<MdChat />}
                      display="none"
                      _selected={{}}
                    >
                      Chat
                    </Button>
                  </Tooltip>
                </RouterLink>

                <Divider />

                <RouterLink to={`/profile/${auth.user.id}`}>
                  <Button onClick={onClose} w="60vw">
                    View Profile
                  </Button>
                </RouterLink>
                <RouterLink to="/settings">
                  <Button onClick={onClose} w="60vw">
                    Settings
                  </Button>
                </RouterLink>
                <RouterLink to="/help">
                  <Button onClick={onClose} w="60vw">
                    Help
                  </Button>
                </RouterLink>
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <RouterLink to={`/profile/${auth.user.id}`}>
                <Button onClick={auth.logout} colorScheme="red" variant="solid">
                  Log Out
                </Button>
              </RouterLink>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {renderAddListingBtn()}
      </Flex>
    </>
  );
}
