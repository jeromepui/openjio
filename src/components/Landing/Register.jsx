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
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
    } else {
      try {
        const { error } = await supabase.auth.signUp(
          { email, password },
          { data: { username } }
        );
        if (error) throw error;
      } catch (error) {
        if (error.status === 500) {
          alert('Username has been taken!');
        } else {
          alert(error.message);
        }
      } finally {
        alert('Check your email to confirm your sign up!');
        navigate('/login');
      }
    }
  };

  return (
    <Flex
      align="center"
      bgGradient={'linear(to-l, #FED811, #FDC100)'}
      direction="column"
      h="100vh"
      justify="center"
      w={{ base: '100vw', md: '50%' }}
    >
      <Box bg="white" boxShadow="lg" p="8" rounded="lg">
        <Stack spacing="4">
          <Heading fontSize="2xl" textAlign="center">
            Sign Up
          </Heading>
          <form onSubmit={handleSignUp}>
            <Stack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  value={email}
                />
              </FormControl>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  value={username}
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
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  onChange={e => setConfirmPassword(e.target.value)}
                  type="password"
                  value={confirmPassword}
                />
              </FormControl>
              <Flex justifyContent="space-between">
                <Text>Already have an account?</Text>
                <Link to="/login">
                  <Text color="blue.600">Sign in</Text>
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
                Sign up
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
}
