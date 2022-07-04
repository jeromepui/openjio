import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export default function SettingsButton() {
  const auth = useAuth();

  return (
    <Box>
      <Menu>
        <MenuButton as={IconButton} borderRadius="50%" icon={<MdSettings />} />
        <MenuList>
          <Link to={`/profile/${auth.user.id}`}>
            <MenuItem>View Profile</MenuItem>
          </Link>
          <Link to="/settings">
            <MenuItem>Settings</MenuItem>
          </Link>
          <MenuItem onClick={auth.logout}>Log Out</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
