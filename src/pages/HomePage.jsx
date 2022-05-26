import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBar from '../components/Layout/MainNavBar/TitleBar';
import Listings from '../components/Listings/Listings';

export default function HomePage() {
  return (
    <Layout>
      <TitleBar backButton={false} text="Welcome to OpenJio"></TitleBar>
      <Listings></Listings>
    </Layout>
  );
}
