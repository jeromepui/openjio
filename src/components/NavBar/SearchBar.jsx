import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

export default function SearchBar() {
  return (
    <InputGroup w="40%">
      <Input
        bg="white"
        borderRadius="10"
        placeholder="Search for listings (Work in Progress)"
      />
      <InputLeftElement children={<MdSearch />} />
      <InputRightElement
        children={
          <Button h="8" mr="4">
            Go
          </Button>
        }
      />
    </InputGroup>
  );
}
