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
  HStack,
  Avatar
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
              <Box boxShadow="lg" h="100px" key={index} p="4" rounded="lg">
                <Stack
                  align={{ base: 'center', md: 'stretch' }}
                  textAlign={{ base: 'center', md: 'left' }}
                  mt={{ base: 4, md: 0 }}
                >
                <HStack>
                      <Avatar
                        name={listing.username}
                        src={`https://mtwxkbwufcrhoaevfoxk.supabase.co/storage/v1/object/public/${listing.avatarUrl}`}
                        size="xs"
                      />
                      <Text fontSize="xs">{listing.username}</Text>
                    </HStack>
                    <Text
                      color="black"
                      fontSize="lg"
                      fontWeight="bold"
                      noOfLines="1"
                    >
                      {listing.title}
                    </Text>

                  <Text color="teal.500" fontSize="lg" fontWeight="bold">
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
