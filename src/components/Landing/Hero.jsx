import { Flex, Heading, Stack, Text } from '@chakra-ui/react';

export default function Hero() {
  return (
    <Flex
      alignItems="center"
      bgGradient={'linear(to-r, #FFECAB, #FDC500)'}
      h={{ base: '0', md: '100vh' }}
      justifyContent="center"
      w={{ base: '0', md: '50%' }}
    >
      <Stack w={{ base: '0', md: '70%' }}>
        <Heading fontSize="6xl">OpenJio</Heading>
        <Text fontSize="4xl">Your go-to website for group buy deals!</Text>
      </Stack>
    </Flex>
  );
}
