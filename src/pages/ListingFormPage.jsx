import Layout from '../components/Layout/Layout';
import ListingForm from '../components/Listings/ListingForm/ListingForm';
import TitleBar from '../components/Layout/TitleBar';

export default function ListingFormPage() {
  return (
    <Layout>
      <TitleBar backButton={true} text="Add a new listing"></TitleBar>
      <ListingForm />
    </Layout>
  );
}
