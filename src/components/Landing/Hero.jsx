import { Flex, Heading, Stack, Text } from '@chakra-ui/react';

export default function Hero() {
  return (
    <Flex
      align="center"
      bgGradient={'linear(to-r, #FED811, #FDC100)'}
      display={{ base: 'none', md: 'flex' }}
      justify="center"
      w="50%"
    >
      <Stack w="70%">
        <Heading fontSize="6xl">OpenJio</Heading>
        <Text fontSize="xl">
          Your go-to website for coordinating group buy deals!
        </Text>
      </Stack>
    </Flex>
  );
}
