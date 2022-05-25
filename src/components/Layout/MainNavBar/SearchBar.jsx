import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

export default function SearchBar() {
  return (
    <InputGroup w={'40%'}>
      <Input
        placeholder="Search for listings (Work in Progress)"
        borderRadius="10"
        focusBorderColor="black"
      />
      <InputLeftElement children={<BiSearch />} />
      <InputRightElement
        children={
          <Button variant="solid" size="md" marginRight="1rem" h="1.5rem">
            Go
          </Button>
        }
      />
    </InputGroup>
  );
}
