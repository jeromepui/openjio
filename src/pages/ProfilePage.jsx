import {
  Alert,
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Layout from '../components/Layout/MainNavBar/Layout';

export default function ProfilePage({ session }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select('username , avatar_url')
        .eq('id', user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async e => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = supabase.auth.user();

      let avatarUrl = '';

      if (image) {
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(`${Date.now()}_${image.name}`, image);

        if (error) throw error;

        if (data) {
          setAvatarUrl(data.Key);
          avatarUrl = data.Key;
        }
      }

      const updates = {
        id: user.id,
        updated_at: new Date(),
        username,
        avatar_url: avatarUrl,
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box alignItems="center" justifyContent="center" m="5" p="5">
        <form onSubmit={updateProfile}>
          <Stack spacing="4">
            <Heading>Edit profile</Heading>
            {loading ? (
              <Alert status="info">Loading...</Alert>
            ) : (
              <>
                <FormControl>
                  <FormLabel>Profile photo</FormLabel>
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Avatar
                        alt={avatarUrl ? 'Avatar' : 'No image'}
                        size="xl"
                        src={
                          avatarUrl
                            ? `https://mtwxkbwufcrhoaevfoxk.supabase.co/storage/v1/object/public/${avatarUrl}`
                            : ''
                        }
                      ></Avatar>
                    </Center>
                    <Center>
                      <VStack>
                        <Input
                          accept="image/jpeg image/png"
                          size="sm"
                          type="file"
                          onChange={e => setImage(e.target.files[0])}
                        />
                      </VStack>
                    </Center>
                  </Stack>
                </FormControl>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    isDisabled
                    type="email"
                    value={supabase.auth.session().user.email}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                  />
                </FormControl>
                <Button
                  bg={'#0FA3B1'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  width={{ base: 'auto', md: '20%' }}
                >
                  Save Changes
                </Button>
              </>
            )}
          </Stack>
        </form>
      </Box>
    </Layout>
  );
}
