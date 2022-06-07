import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile } from '../../utils/UserUtils';

export default function ChatConversationsHeader() {
  const auth = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error } = await getUserProfile(auth.user.id);
        if (error) throw error;

        setUserData(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getProfile();
  }, [auth.user.id]);

  return (
    <Flex bg="gray.400" p="2" w="100%">
      <Avatar
        size="lg"
        name={userData?.username}
        src={
          userData?.avatar_url
            ? `https://mtwxkbwufcrhoaevfoxk.supabase.co/storage/v1/object/public/${userData?.avatar_url}`
            : ''
        }
      ></Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg">{userData?.username}</Text>
      </Flex>
    </Flex>
  );
}
