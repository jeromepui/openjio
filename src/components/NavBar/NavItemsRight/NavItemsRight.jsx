import { Button, HStack } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ChatButton from './ChatButton';
import ProfileButton from './ProfileButton';

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
      <ChatButton />
      <ProfileButton />
    </HStack>
  );
}
