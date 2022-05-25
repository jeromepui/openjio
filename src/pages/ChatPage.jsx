import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import Layout from '../components/Layout/MainNavBar/Layout';

export default function ChatPage() {
  return (
    <Layout>
      <Alert status="info" m="4" w="auto" borderRadius="10">
        <AlertIcon />
        <AlertTitle>Coming soon.</AlertTitle>
        <AlertDescription>
          You will be able to chat with other users soon!
        </AlertDescription>
      </Alert>
    </Layout>
  );
}
