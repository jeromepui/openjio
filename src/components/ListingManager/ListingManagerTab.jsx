import { useEffect, useState } from 'react';
import { Heading, Wrap } from '@chakra-ui/react';
import ManagerListingCard from './ManagerListingCard';
import { supabase } from '../../supabase';

export default function ListingManager({ category, status }) {
  const [listings, setListings] = useState(null);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    try {
      const user = supabase.auth.user();

      if (category === 'open' || category === 'closed') {
        const { data, error } = await supabase
          .from('listings')
          .select()
          .eq('created_by', user.id)
          .eq('status', status);

        if (error) throw error;

        setListings(data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Wrap mx="4" p="2" spacing="30px">
      {listings?.length > 0 ? (
        listings?.map((listing, index) => (
          <ManagerListingCard
            category={category}
            key={index}
            listing={listing}
          ></ManagerListingCard>
        ))
      ) : (
        <Heading fontSize="2xl">
          You do not have any {category} listings.
        </Heading>
      )}
    </Wrap>
  );
}
