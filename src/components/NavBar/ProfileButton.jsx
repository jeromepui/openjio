import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { MdPerson } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileButton() {
  const auth = useAuth();
  return (
    <Box>
      <Menu>
        <MenuButton as={IconButton} borderRadius="50%" icon={<MdPerson />} />
        <MenuList>
          <Link to="/settings">
            <MenuItem>Settings</MenuItem>
          </Link>
          <MenuItem onClick={auth.logout}>Log Out</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
