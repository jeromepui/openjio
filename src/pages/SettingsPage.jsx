import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import TitleBar from '../components/TitleBar/TitleBar';
import { getUserProfile } from '../utils/UserUtils';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsPage() {
  const auth = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);

        const { data, error } = await getUserProfile(auth.user.id);
        if (error) throw error;

        if (data) {
          setAvatarUrl(data.avatar_url);
          setUsername(data.username);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
    setUser(supabase.auth.user());
  }, [auth.user.id, avatarUrl]);

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

      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('profile_id', auth.user.id);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIcon = async () => {
    try {
      setAvatarUrl('reload');

      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: '' })
        .eq('profile_id', auth.user.id);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setAvatarUrl('');
    }
  };

  return (
    <>
      <TitleBar backButton={true} text="Edit profile" />
      <Box px="6">
        {loading ? (
          <Flex align="center" justify="center">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <form onSubmit={updateProfile}>
            <Stack spacing="4">
              <FormControl>
                <FormLabel>Profile photo</FormLabel>
                <Stack direction="column" spacing={6}>
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
                  <Input
                    accept="image/jpeg image/png"
                    maxW="300px"
                    size="sm"
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                  />
                  <Button
                    bg="#02CECB"
                    color="white"
                    _hover={{
                      background: '#06837F',
                    }}
                    maxW="300px"
                    type="submit"
                  >
                    Upload photo
                  </Button>
                </Stack>
              </FormControl>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  isDisabled
                  maxW="300px"
                  type="email"
                  value={user.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input isDisabled maxW="300px" type="text" value={username} />
              </FormControl>
            </Stack>
          </form>
        )}
      </Box>
    </>
  );
}
