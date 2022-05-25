import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBarContext from '../contexts/TitleBarContext';
import { useContext, useEffect } from 'react';
import { Text, IconButton, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr'

export default function DashboardPage() {
  const TBarContext = useContext(TitleBarContext);
  useEffect(() => {
    TBarContext.toggleBackButton(false);
    TBarContext.changeTitle('Your dashboard');
  });

  return (
    <Layout>
      <Box paddingLeft="3%" paddingBottom="2%" bgColor="teal.300">
        <Text display="block" width="100vw" marginBottom="1%" fontWeight="bold">
          Quick Tools
        </Text>
        <Link to="/dashboard/add-new-listing">
          <IconButton icon={<GrAddCircle aria-label='Add new listing'/>} />
        </Link>
      </Box>
    </Layout>
  );
}
