import Layout from '../components/Layout/MainNavBar/Layout';
import ListingForm from '../components/Listings/ListingForm';
import TitleBar from '../components/Layout/MainNavBar/TitleBar';

export default function ListingFormPage() {
  return (
    <Layout>
      <TitleBar backButton={true} text="Add a new listing"></TitleBar>
      <ListingForm />
    </Layout>
  );
}
