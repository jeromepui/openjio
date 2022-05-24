import { Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import LoginCard from '../components/Login/LoginCard';

export default function LoginPage() {
  return (
    <>
      <Stack w="auto" direction={{ base: 'column', md: 'row' }} spacing="0">
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
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          h="100vh"
          w={{ base: 'auto', md: '50%' }}
          bgGradient={'linear(to-l, #FFECAB, #FDC500)'}
        >
          <Stack spacing="10">
            <Heading fontSize={'4xl'} textAlign="center">
              OpenJio
            </Heading>
            <LoginCard />
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
