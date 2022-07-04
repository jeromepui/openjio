import { Button, HStack } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ProfileButton from './SettingsButton';

export default function NavItemsRight() {
  return (
    <HStack spacing="8">
      <Link to="/add-listing">
        <Button
          bg="#B4FFFF"
          color="black"
          _hover={{
            background: '#B4FFFF',
          }}
          leftIcon={<MdAdd />}
        >
          Add Listing
        </Button>
      </Link>
      <ProfileButton />
    </HStack>
  );
}
