import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import TitleBar from '../components/TitleBar/TitleBar';

export default function ChatPage() {
  return (
    <>
      <TitleBar backButton={false} text="Chat" />
      <Alert borderRadius="10" m="4" status="info" w="50%">
        <AlertIcon />
        <AlertTitle>Coming soon.</AlertTitle>
        <AlertDescription>
          You will be able to chat with other users soon!
        </AlertDescription>
      </Alert>
    </>
  );
}
