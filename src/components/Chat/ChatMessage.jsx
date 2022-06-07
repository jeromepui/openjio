import { Avatar, Flex, Text } from '@chakra-ui/react';

export default function ChatMessage({ content, sender }) {
  if (sender === 'me') {
    return (
      <Flex w="100%" justify="flex-end">
        <Flex
          bg="#06837F"
          borderRadius="20"
          color="white"
          minW="100px"
          maxW="350px"
          my="2"
          px="4"
          py="2"
        >
          <Text>{content}</Text>
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex w="100%">
      <Avatar name="" src="" bg="blue.300"></Avatar>
      <Flex
        bg="gray.100"
        borderRadius="20"
        color="black"
        minW="100px"
        maxW="350px"
        my="2"
        mx="2"
        px="4"
        py="2"
      >
        <Text>{content}</Text>
      </Flex>
    </Flex>
  );
}
