import { Text, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link to="/">
        <Text fontSize="lg" fontWeight="700" margin="1em">
          OpenJio
        </Text>
      </Link>
    </Box>
  );
}
