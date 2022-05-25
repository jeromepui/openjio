import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import Layout from '../components/Layout/MainNavBar/Layout';

export default function CommunityPage() {
  return (
    <Layout>
      <Alert status="info" m="4" w="auto" borderRadius="10">
        <AlertIcon />
        <AlertTitle>Coming soon.</AlertTitle>
        <AlertDescription>
          Keep an eye on this section for an exciting upcoming feature!
        </AlertDescription>
      </Alert>
    </Layout>
  );
}
