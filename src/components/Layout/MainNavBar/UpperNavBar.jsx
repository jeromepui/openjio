import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { BsChatFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Logo from './Logo';
import SearchBar from './SearchBar';

export default function UpperNavBar() {
  const auth = useAuth();

  return (
    <Flex align="center" bgColor="#FDC500" justify="space-between" w="auto">
      <Logo />
      <SearchBar />
      <HStack px="4" spacing="4">
        <Link to="/chat">
          <IconButton
            aria-label="Chat"
            borderRadius="50%"
            icon={<BsChatFill />}
          />
        </Link>
        <Box>
          <Menu>
            <MenuButton
              aria-label="Profile"
              as={IconButton}
              borderRadius="50%"
              icon={<CgProfile />}
            />
            <MenuList>
              <Link to="/profile">
                <MenuItem>Settings</MenuItem>
              </Link>
              <MenuItem onClick={auth.logout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </Flex>
  );
}
