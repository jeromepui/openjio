import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Flex w="6%">
      <Link to="/">
        <Text fontSize="lg" fontWeight="700">
          OpenJio
        </Text>
      </Link>
    </Flex>
  );
}
