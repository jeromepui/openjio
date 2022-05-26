import { Flex, Heading, Stack } from '@chakra-ui/react';
import Hero from '../components/Login/Hero';
import LoginForm from '../components/Login/LoginForm';

export default function LoginPage() {
  return (
    <>
      <Stack w="auto" direction={{ base: 'column', md: 'row' }} spacing="0">
        <Hero />
        <Flex
          alignItems="center"
          bgGradient={'linear(to-l, #FFECAB, #FDC500)'}
          direction="column"
          h="100vh"
          justifyContent="center"
          w={{ base: 'auto', md: '50%' }}
        >
          <Stack spacing="10">
            <Heading fontSize={'4xl'} textAlign="center">
              OpenJio
            </Heading>
            <LoginForm />
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
