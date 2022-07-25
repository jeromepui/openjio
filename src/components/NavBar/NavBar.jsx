import { Flex, HStack } from '@chakra-ui/react';
import Logo from './Logo';
import MobileDrawer from './MobileDrawer';
import NavItemsLeft from './NavItemsLeft/NavItemsLeft';
import NavItemsRight from './NavItemsRight/NavItemsRight';

export default function NavBar() {
  return (
    <Flex
      alignItems="center"
      bg="#FDC100"
      py="2"
      px="6"
    >
      <HStack
        display={{ sm: 'none', md: 'flex' }}
        justify="space-between"
        w="98%"
      >
        <Logo />
        <NavItemsLeft />
        <NavItemsRight />
      </HStack>
      <MobileDrawer />
    </Flex>
  );
}
