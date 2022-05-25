import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBarContext from '../contexts/TitleBarContext';
import { useContext, useEffect } from 'react';

export default function HomePage() {
  const TBarContext = useContext(TitleBarContext);
  useEffect(() => {
    TBarContext.toggleBackButton(false);
    TBarContext.changeTitle('Welcome to OpenJio');
  });
  return <Layout></Layout>;
}
