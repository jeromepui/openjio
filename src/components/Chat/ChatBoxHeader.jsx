import { Flex, Text } from '@chakra-ui/react';

export default function ChatBoxHeader({ listingTitle }) {
  return (
    <Flex p="2" w="100%">
      <Text fontSize="lg" fontWeight="bold">
        {listingTitle}
      </Text>
    </Flex>
  );
}
