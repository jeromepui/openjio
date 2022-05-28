import ListingForm from '../components/ListingForm/ListingForm';
import TitleBar from '../components/TitleBar/TitleBar';

export default function ListingFormPage() {
  return (
    <>
      <TitleBar backButton={true} text="Add a new listing"></TitleBar>
      <ListingForm />
    </>
  );
}
