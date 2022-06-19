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
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabase';

export default function Login() {
  const auth = useAuth();
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

  const handleSignInWithGoogle = async e => {
    e.preventDefault();
    try {
      const { error } = await auth.signInWithGoogle();
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Flex
      align="center"
      bgGradient={'linear(to-l, #FED811, #FDC100)'}
      h="100vh"
      direction="column"
      justify="center"
      w={{ base: '100vw', md: '50%' }}
    >
      <Box bg="white" boxShadow="lg" p="8" rounded="lg">
        <Stack spacing="4">
          <Heading fontSize="2xl" textAlign="center">
            Welcome to OpenJio
          </Heading>
          <form onSubmit={handleSignIn}>
            <Stack spacing="4">
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter email"
                  type="email"
                  value={email}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  type="password"
                  value={password}
                />
              </FormControl>
              <Flex justifyContent="space-between">
                <Text>Don't have an account?</Text>
                <Link to="/register">
                  <Text color="blue.600">Sign up</Text>
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
          <Button
            leftIcon={<FcGoogle />}
            onClick={handleSignInWithGoogle}
            w="100%"
          >
            Sign in with Google
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
