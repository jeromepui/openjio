import { useParams } from 'react-router-dom';
import SearchListings from '../components/Listings/SearchListings';
import TitleBar from '../components/TitleBar/TitleBar';
 
export default function SearchPage() {
  const { search } = useParams();

  return (
    <>
      <TitleBar backButton={true} text={`Search results for "${search}"`} />
      <SearchListings search={search} />
    </>
  );
}
