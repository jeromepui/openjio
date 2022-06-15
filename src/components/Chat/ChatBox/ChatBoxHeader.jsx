import { Flex, Text } from '@chakra-ui/react';

export default function ChatBoxHeader({ listingTitle }) {
  return (
    <Flex p="2">
      <Text fontSize="lg" fontWeight="500">
        {listingTitle}
      </Text>
    </Flex>
  );
}
