import {
  Alert,
  AlertIcon,
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
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await auth.login(email);
      if (error) throw error;
      setSent(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setEmail('');
      setLoading(false);
    }
  };

  return (
    <Flex
      alignItems="center"
      bgGradient={'linear(to-l, #FED811, #FDC100)'}
      direction="column"
      h="100vh"
      justifyContent="center"
      w={{ base: 'auto', md: '50%' }}
    >
      <Box bg="white" boxShadow="lg" p="8" rounded="lg">
        <Stack spacing="4">
          <Heading fontSize="3xl" textAlign="center">
            Welcome to OpenJio
          </Heading>
          <Text>Sign in via magic link with your email below</Text>
          {sent && (
            <Alert status="success">
              <AlertIcon />
              Check your email for the login link!
            </Alert>
          )}
          {loading ? (
            <Text>Sending magic link...</Text>
          ) : (
            <form onSubmit={handleLogin}>
              <Stack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    value={email}
                  />
                </FormControl>
                <Button
                  bg="#02CECB"
                  color="white"
                  _hover={{
                    background: '#06837F',
                  }}
                  isLoading={loading}
                  type="submit"
                  w="100%"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          )}
        </Stack>
      </Box>
    </Flex>
  );
}
