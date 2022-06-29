import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { increaseSlots } from '../../utils/ListingUtils';
import {
  getJoinedListings,
  leaveListing,
} from '../../utils/ListingParticipantUtils';

export default function JoinedTab({ shouldRefresh, setShouldRefresh }) {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);
        const { data, error } = await getJoinedListings(auth.user.id);
        if (error) throw error;

        setListings(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getListings();
  }, [auth.user.id, shouldRefresh]);

  const handleLeave = async listingId => {
    try {
      const { error: leaveError } = await leaveListing(listingId, auth.user.id);
      if (leaveError) throw leaveError;

      const { error: incrementError } = await increaseSlots(listingId);
      if (incrementError) throw incrementError;
    } catch (error) {
      alert(error.message);
    } finally {
      setShouldRefresh(prev => !prev);
    }
  };

  return (
    <>
      {loading ? (
        <Flex grow="1" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ sm: '1', md: '4' }} spacing="8">
          {listings?.length > 0 ? (
            listings.map((listing, index) => (
              <Box key={index}>
                <Flex boxShadow="lg" h="120px" p="4" rounded="lg">
                  <Stack alignContent="left">
                    <Text fontSize="2xl" fontWeight="700" noOfLines="1">
                      {listing.title}
                    </Text>
                    <Text
                      fontSize="2xl"
                      fontWeight="700"
                      noOfLines="1"
                      w="200px"
                    >
                      {listing.listing_title}
                    </Text>
                    <ButtonGroup>
                      <Link to={`/listing/${listing.listing_id}`}>
                        <Button>View Listing</Button>
                      </Link>
                      <Button
                        colorScheme="red"
                        onClick={() => handleLeave(listing.listing_id)}
                      >
                        Leave Listing
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </Flex>
              </Box>
            ))
          ) : (
            <Heading fontSize="2xl">You have not joined any listings.</Heading>
          )}
        </SimpleGrid>
      )}
    </>
  );
}
