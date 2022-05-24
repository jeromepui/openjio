import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

function LoginCard() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow="lg"
      p="8"
      rounded="lg"
    >
      <Stack spacing={4}>
        <Heading fontSize="3xl" textAlign="center">
          Welcome
        </Heading>
        <Text>Sign in via magic link with your email below</Text>
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

export default LoginCard;
