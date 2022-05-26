import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBar from '../components/Layout/MainNavBar/TitleBar';

export default function CommunityPage() {
  return (
    <Layout>
      <TitleBar backButton={false} text="Community"></TitleBar>
      <Alert borderRadius="10" m="4" status="info" w="auto">
        <AlertIcon />
        <AlertTitle>Coming soon.</AlertTitle>
        <AlertDescription>
          Keep an eye on this section for an exciting upcoming feature!
        </AlertDescription>
      </Alert>
    </Layout>
  );
}
