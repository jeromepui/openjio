import { Stack } from '@chakra-ui/react';
import Hero from '../components/Landing/Hero';
import Register from '../components/Landing/Register';

export default function LoginPage() {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing="0" w="auto">
      <Hero />
      <Register />
    </Stack>
  );
}
