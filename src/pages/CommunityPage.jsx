import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBarContext from '../contexts/TitleBarContext';
import { useContext, useEffect } from 'react';

export default function CommunityPage() {
  const TBarContext = useContext(TitleBarContext);
  useEffect(() => {
    TBarContext.toggleBackButton(false);
    TBarContext.changeTitle('The OpenJio Community');
  });
  
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
