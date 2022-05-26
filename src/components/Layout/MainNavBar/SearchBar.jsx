import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

export default function SearchBar() {
  return (
    <InputGroup w="40%">
      <Input
        borderRadius="10"
        focusBorderColor="black"
        placeholder="Search for listings (Work in Progress)"
      />
      <InputLeftElement children={<BiSearch />} />
      <InputRightElement
        children={
          <Button h="60%" mr="4" size="md" variant="solid">
            Go
          </Button>
        }
      />
    </InputGroup>
  );
}
