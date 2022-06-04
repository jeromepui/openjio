import {
  Alert,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import TitleBar from '../components/TitleBar/TitleBar';
import { getUserProfile } from '../utils/UserUtils';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const auth = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);

        const { userData, error } = await getUserProfile(auth.user.id);
        if (error) throw error;

        if (userData) {
          setUsername(userData.username);
          setAvatarUrl(userData.avatar_url);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
    setUser(supabase.auth.user());
  }, [auth.user.id]);

  const updateProfile = async e => {
    e.preventDefault();
    try {
      setLoading(true);

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

      const updateProfile = {
        profile_id: user.id,
        updated_at: new Date(),
        username,
        avatar_url: avatarUrl,
      };

      const { error } = await supabase.from('profiles').upsert(updateProfile);

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIcon = async () => {
    try {
      const updateAvatar = {
        profile_id: user.id,
        avatar_url: '',
      };

      const { error } = await supabase.from('profiles').upsert(updateAvatar);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
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
                      >
                        <AvatarBadge
                          as={IconButton}
                          colorScheme="red"
                          icon={<SmallCloseIcon />}
                          onClick={handleDeleteIcon}
                          rounded="full"
                          size="sm"
                          top="-10px"
                        />
                      </Avatar>
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
                  <Input isDisabled type="email" value={user.email} />
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
                  bg="#02CECB"
                  color="white"
                  _hover={{
                    background: '#06837F',
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
    </>
  );
}
