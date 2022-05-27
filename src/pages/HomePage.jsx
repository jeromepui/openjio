import Layout from '../components/Layout/Layout';
import TitleBar from '../components/Layout/TitleBar';
import Listings from '../components/Listings/Listings';

export default function HomePage() {
  return (
    <Layout>
      <TitleBar backButton={false} text="Welcome to OpenJio"></TitleBar>
      <Listings />
    </Layout>
  );
}
