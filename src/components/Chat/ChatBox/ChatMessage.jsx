import { Avatar, Flex, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getUserProfile } from '../../../utils/UserUtils';

export default function ChatMessage({ content, senderId, senderUsername }) {
  const auth = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const getUserAvatar = async () => {
      try {
        const { data, error } = await getUserProfile(senderId);
        if (error) throw error;

        setAvatarUrl(data.avatar_url);
      } catch (error) {
        alert(error.message);
      }
    };
    getUserAvatar();
  });

  return (
    <>
      {senderId === auth.user.id ? (
        <Flex w="100%" justify="flex-end">
          <Flex
            bg="#06837F"
            borderRadius="20"
            color="white"
            maxW="350px"
            my="1"
            px="4"
            py="2"
          >
            <Text>{content}</Text>
          </Flex>
        </Flex>
      ) : (
        <Flex align="center" w="100%">
          <Avatar
            name=""
            size="sm"
            src={
              avatarUrl
                ? `https://mtwxkbwufcrhoaevfoxk.supabase.co/storage/v1/object/public/${avatarUrl}`
                : ''
            }
            bg="blue.300"
          ></Avatar>
          <Flex
            bg="gray.100"
            borderRadius="20"
            color="black"
            maxW="350px"
            my="1"
            mx="2"
            px="4"
            py="2"
          >
            <VStack align="left">
              <Text color="#06837F" fontSize="sm">
                {senderUsername}
              </Text>
              <Text>{content}</Text>
            </VStack>
          </Flex>
        </Flex>
      )}
    </>
  );
}
