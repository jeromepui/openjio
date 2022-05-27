import { Stack } from '@chakra-ui/react';
import Hero from '../components/Landing/Hero';
import Login from '../components/Landing/Login';

export default function LoginPage() {
  return (
    <>
      <Stack w="auto" direction={{ base: 'column', md: 'row' }} spacing="0">
        <Hero />
        <Login />
      </Stack>
    </>
  );
}
