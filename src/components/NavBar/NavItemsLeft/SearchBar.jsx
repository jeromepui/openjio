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
    <InputGroup>
      <Input
        bg="white"
        borderRadius="10"
        placeholder="Search for listings (Work in Progress)"
        w="500px"
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
