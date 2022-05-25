import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBarContext from '../contexts/TitleBarContext';
import { useContext, useEffect } from 'react';

export default function CommunityPage() {
  const TBarContext = useContext(TitleBarContext);
  useEffect(() => {
    TBarContext.toggleBackButton(false);
    TBarContext.changeTitle('The OpenJio Community');
  });
  return <Layout></Layout>;
}
