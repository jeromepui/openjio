import ListingManager from '../components/ListingManager/ListingManager';
import TitleBar from '../components/TitleBar/TitleBar';

export default function DashboardPage() {
  return (
    <>
      <TitleBar backButton={false} text="Dashboard" />
      <ListingManager />
    </>
  );
}
