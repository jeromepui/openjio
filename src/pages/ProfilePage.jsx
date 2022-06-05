import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../utils/UserUtils';
import TitleBar from '../components/TitleBar/TitleBar';

export default function ProfilePage() {
  const { id: profileId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { userData, userError } = await getUserProfile(profileId);
        if (userError) throw userError;

        setProfile(userData);
      } catch (error) {
        alert(error.message);
      }
    };
    getProfile();
  }, [profileId]);

  return (
    <>
      <TitleBar backButton={false} text="Profile" />
      <Box px="6" w={['auto', '50%']}>
        <Text>{profile?.username}</Text>
        <Text></Text>
        <Text></Text>
      </Box>
    </>
  );
}
