import { Text, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link to="/">
        <Text
          fontSize="md"
          fontFamily="sans-serif"
          margin="1em"
          fontWeight="1000"
        >
          OpenJio
        </Text>
      </Link>
    </Box>
  );
}
