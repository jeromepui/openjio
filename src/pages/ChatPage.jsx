import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBar from '../components/Layout/MainNavBar/TitleBar';

export default function ChatPage() {
  return (
    <Layout>
      <TitleBar backButton={false} text="Chat" />
      <Alert borderRadius="10" m="4" w="auto" status="info">
        <AlertIcon />
        <AlertTitle>Coming soon.</AlertTitle>
        <AlertDescription>
          You will be able to chat with other users soon!
        </AlertDescription>
      </Alert>
    </Layout>
  );
}
