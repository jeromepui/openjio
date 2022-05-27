import { Flex, HStack } from '@chakra-ui/react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ChatButton from './ChatButton';
import ProfileButton from './ProfileButton';

export default function TopNavBar() {
  return (
    <Flex align="center" bgColor="#FDC500" justify="space-between" w="auto">
      <Logo />
      <SearchBar />
      <HStack px="4" spacing="4">
        <ChatButton />
        <ProfileButton />
      </HStack>
    </Flex>
  );
}
