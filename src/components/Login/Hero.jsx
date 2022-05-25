import { Flex, Heading, Text, VStack } from '@chakra-ui/react';

export default function Hero() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h={{ base: '0', md: '100vh' }}
      w={{ base: '0', md: '50%' }}
      bgGradient={'linear(to-r, #FFECAB, #FDC500)'}
    >
      <VStack w={{ base: '0', md: '70%' }} alignItems="left">
        <Heading fontSize={{ md: '6xl', lg: '7xl' }}>OpenJio</Heading>
        <Text fontSize="2xl">Your go-to website for group buy deals!</Text>
      </VStack>
    </Flex>
  );
}
