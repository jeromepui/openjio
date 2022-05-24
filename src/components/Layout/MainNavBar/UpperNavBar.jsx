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
import Logo from './Logo';
import SearchBar from './SearchBar';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function UpperNavBar() {
  const auth = useAuth();

  return (
    <Flex bgColor="#FDC500" justify="space-between" align="center" pr={2}>
      <Logo />
      <SearchBar />
      <HStack>
        <IconButton
          aria-label="Chat"
          borderRadius="50%"
          icon={<BsChatFill />}
        />
        <Box>
          <Menu>
            <MenuButton
              aria-label="Profile"
              as={IconButton}
              borderRadius="50%"
              icon={<CgProfile />}
            />
            <MenuList>
              <Link to="/account">
                <MenuItem>Profile settings</MenuItem>
              </Link>
              <MenuItem onClick={auth.logout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </Flex>
  );
}
