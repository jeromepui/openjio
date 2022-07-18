import { Button, HStack } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ProfileButton from './SettingsButton';

export default function NavItemsRight() {
  return (
    <HStack spacing="8">
      <Link to="/add-listing">
        <Button
          bg="white"
          color="#06837F"
          borderRadius="8px"
          border="solid"
          borderColor="#06837F"
          _hover={{
            background: '#E1FCFC',
            opacity: '100%',
          }}
          leftIcon={<MdAdd />}
        >
          New Listing
        </Button>
      </Link>
      <ProfileButton />
    </HStack>
  );
}
