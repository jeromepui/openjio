import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginForm() {
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
      alert(error.error_description || error.message);
    } finally {
      setEmail('');
      setLoading(false);
    }
  };

  return (
    <Box bg="gray.100" boxShadow="lg" p="8" rounded="lg">
      <Stack spacing={4}>
        <Heading fontSize="3xl" textAlign="center">
          Welcome
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
                bg={'#0FA3B1'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
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
  );
}
