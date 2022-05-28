import { Stack } from '@chakra-ui/react';
import Hero from '../components/Landing/Hero';
import Login from '../components/Landing/Login';

export default function LoginPage() {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing="0" w="auto">
      <Hero />
      <Login />
    </Stack>
  );
}
