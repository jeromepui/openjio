import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    if (search === '') return;
    navigate(`/search/${search}`);
    setSearch('');
  };

  return (
    <InputGroup>
      <Input
        bg="white"
        borderRadius="10"
        onChange={e => setSearch(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        placeholder="Search for listings"
        value={search}
        w="500px"
      />
      <InputLeftElement children={<MdSearch />} />
      <InputRightElement
        children={
          <Button h="8" mr="4" onClick={handleSearch}>
            Go
          </Button>
        }
      />
    </InputGroup>
  );
}
