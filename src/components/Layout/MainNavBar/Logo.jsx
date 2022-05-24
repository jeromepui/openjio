import React from 'react';
import { Text, Box } from '@chakra-ui/react';

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text
        fontSize="md"
        fontFamily="sans-serif"
        margin="1em"
        fontWeight="1000"
      >
        OpenJio
      </Text>
    </Box>
  );
}
