import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async e => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Flex
      align="center"
      bgGradient={'linear(to-l, #FED811, #FDC100)'}
      direction="column"
      h="100vh"
      justify="center"
      w={{ base: 'auto', md: '50%' }}
    >
      <Box bg="white" boxShadow="lg" p="8" rounded="lg">
        <Stack spacing="4">
          <Heading fontSize="3xl" textAlign="center">
            Welcome to OpenJio
          </Heading>
          <Text>Login</Text>
          <form onSubmit={handleSignIn}>
            <Stack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  value={email}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  value={password}
                />
              </FormControl>
              <Flex justifyContent="space-between">
                <Text>Don't have an account?</Text>
                <Link to="/register">
                  <Text color="blue.500">Sign up</Text>
                </Link>
              </Flex>

              <Button
                bg="#02CECB"
                color="white"
                _hover={{
                  background: '#06837F',
                }}
                type="submit"
                w="100%"
              >
                Sign in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
}
