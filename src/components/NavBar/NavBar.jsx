import { HStack } from '@chakra-ui/react';
import Logo from './Logo';
import MobileDrawer from './MobileDrawer';
import NavItemsLeft from './NavItemsLeft/NavItemsLeft';
import NavItemsRight from './NavItemsRight/NavItemsRight';

export default function NavBar() {
  return (
    <HStack bg="#FED811" justify="space-between" py="2" px="6">
      <Logo />
      <HStack
        display={{ sm: 'none', md: 'flex' }}
        justify="space-between"
        w="94%"
      >
        <NavItemsLeft />
        <NavItemsRight />
      </HStack>
      <MobileDrawer />
    </HStack>
  );
}
