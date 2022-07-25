import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Flex align="center">
      <Link to="/">
        <Text fontSize="lg" fontWeight="700">
          OpenJio
        </Text>
      </Link>
    </Flex>
  );
}
