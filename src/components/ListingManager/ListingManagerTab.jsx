import { Heading, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ListingManagerCard from './ListingManagerCard';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabase';

export default function ListingManager({ category, status, shouldRefresh, setShouldRefresh }) {
  const auth = useAuth();
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const getListings = async () => {
      try {
        if (category === 'open' || category === 'closed') {
          const { data, error } = await supabase
            .from('listings')
            .select()
            .eq('created_by', auth.user.id)
            .eq('status', status);
          if (error) throw error;

          setListings(data);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getListings();
  }, [auth.user.id, category, status, shouldRefresh]);

  return (
    <SimpleGrid columns="4" spacing="10">
      {listings?.length > 0 ? (
        listings?.map((listing, index) => (
          <ListingManagerCard
            category={category}
            key={index}
            listing={listing}
            setShouldRefresh={setShouldRefresh}
          ></ListingManagerCard>
        ))
      ) : (
        <Heading fontSize="2xl">
          You do not have any {category} listings.
        </Heading>
      )}
    </SimpleGrid>
  );
}
