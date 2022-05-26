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
import { supabase } from '../supabase';
import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBar from '../components/Layout/MainNavBar/TitleBar';

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

      const { error } = await supabase.from('profiles').upsert(updates, {
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
      <TitleBar backButton={false} text="Edit profile" />
      <Box px="6" w={['auto', '50%']}>
        <form onSubmit={updateProfile}>
          <Stack spacing="4">
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
                  bg="#0FA3B1"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  width={['auto', '20%']}
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
