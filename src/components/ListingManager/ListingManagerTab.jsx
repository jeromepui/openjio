import { Flex, Heading, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ListingManagerCard from './ListingManagerCard';
import { useAuth } from '../../contexts/AuthContext';
import { getUserListings } from '../../utils/ListingUtils';
import { getUserProfile } from '../../utils/UserUtils';

export default function ListingManager({
  category,
  status,
  shouldRefresh,
  setShouldRefresh,
}) {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);
        const { data, error } = await getUserListings(auth.user.id, status);
        if (error) throw error;

        const boostedData = [];

        for (const listing of data) {
          const { data: user, error: userError } = await getUserProfile(
            listing.created_by
          );
          if (userError) throw userError;
          const boostedListing = {
            ...listing,
            avatarUrl: user.avatar_url,
            username: user.username,
          };

          boostedData.push(boostedListing);
        }

        setListings(boostedData);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getListings();
  }, [auth.user.id, category, status, shouldRefresh]);

  return (
    <>
      {loading ? (
        <Flex grow="1" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ sm: '1', md: '4' }} spacing="6">
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
      )}
    </>
  );
}
