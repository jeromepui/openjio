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
      <Input placeholder="Search for listings" borderRadius="5px" />
      <InputLeftElement pointerEvents="none" children={<BiSearch />} />
      <InputRightElement
        children={
          <Button
            fontSize="0.8rem"
            variant="solid"
            size="md"
            marginRight="1rem"
            h="1.5rem"
          >
            GO
          </Button>
        }
      />
    </InputGroup>
  );
}
