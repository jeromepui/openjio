import HomeListings from '../components/Listings/HomeListings';
import TitleBar from '../components/TitleBar/TitleBar';

export default function HomePage() {
  return (
    <>
      <TitleBar backButton={false} text="Welcome"></TitleBar>
      <HomeListings />
    </>
  );
}
