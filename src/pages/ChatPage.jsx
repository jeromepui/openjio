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
      <Alert borderRadius="10" mx="6" status="info" maxW="90vw">
        <AlertIcon />
        <AlertTitle>Coming soon.</AlertTitle>
        <AlertDescription>
          You will be able to chat with other users soon!
        </AlertDescription>
      </Alert>
    </>
  );
}
