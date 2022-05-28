import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import TitleBar from '../components/TitleBar/TitleBar';

export default function CommunityPage() {
  return (
    <>
      <TitleBar backButton={false} text="Community"></TitleBar>
      <Alert borderRadius="10" m="4" status="info" w="50%">
        <AlertIcon />
        <AlertTitle>Coming soon.</AlertTitle>
        <AlertDescription>
          Keep an eye on this section for an exciting upcoming feature!
        </AlertDescription>
      </Alert>
    </>
  );
}
