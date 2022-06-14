import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Link,
  VStack,
  DrawerFooter,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function MobileDrawer() {
  const auth = useAuth();
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
                <Link onClick={onClose}>Home</Link>
              </RouterLink>
              <RouterLink to="/dashboard">
                <Link onClick={onClose}>Dashboard</Link>
              </RouterLink>
              <RouterLink to="/add-listing">
                <Link onClick={onClose}>Add Listing</Link>
              </RouterLink>
              <RouterLink to={`/profile/${auth.user.id}`}>
                <Link onClick={onClose}>View Profile</Link>
              </RouterLink>
              <RouterLink to="/settings">
                <Link onClick={onClose}>Settings</Link>
              </RouterLink>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <RouterLink to={`/profile/${auth.user.id}`}>
              <Button onClick={auth.logout}>Log Out</Button>
            </RouterLink>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
