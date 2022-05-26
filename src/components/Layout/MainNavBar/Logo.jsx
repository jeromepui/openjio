import { Text, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Box px="6" py="4">
      <Link to="/">
        <Text fontSize="lg" fontWeight="700">
          OpenJio
        </Text>
      </Link>
    </Box>
  );
}
