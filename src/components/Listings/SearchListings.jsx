import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSearchListings } from '../../utils/ListingUtils';
import { getUserProfile } from '../../utils/UserUtils';

export default function SearchListings({ search }) {
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);

        const { data, error } = await getSearchListings(search);
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
  }, [search]);

  return (
    <>
      {loading ? (
        <Flex grow="1" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <>
          {listings?.length === 0 ? (
            <Flex align="center" direction="column" grow="1">
              <Heading size="xl" mb="2">
                Sorry, we couldn't find any results.
              </Heading>
              <Text fontSize="lg">
                Check your search for any typos or try more generic search
                terms.
              </Text>
            </Flex>
          ) : (
            <SimpleGrid columns={{ sm: '1', md: '4' }} mx="4" p="2" spacing="6">
              {listings?.map((listing, index) => (
                <Box key={index}>
                  <Link to={`/listing/${listing.listing_id}`}>
                    <Flex
                      boxShadow="lg"
                      h="200px"
                      justifyContent={{ sm: 'center', md: 'start' }}
                      p="4"
                      rounded="lg"
                    >
                      <Stack alignContent="left">
                        <HStack>
                          <Avatar
                            name={listing.username}
                            size="sm"
                            src={`https://mtwxkbwufcrhoaevfoxk.supabase.co/storage/v1/object/public/${listing.avatarUrl}`}
                          />
                          <Text fontSize="md">{listing.username}</Text>
                        </HStack>
                        <Text
                          fontSize="2xl"
                          fontWeight="700"
                          noOfLines="1"
                          w="300px"
                        >
                          {listing.title}
                        </Text>
                        {listing.remaining_slots > 0 ? (
                          <Badge
                            colorScheme="green"
                            display="flex"
                            justifyContent="center"
                            w="140px"
                          >
                            {listing.remaining_slots === 1
                              ? '1 slot remaining'
                              : `${listing.remaining_slots} slots remaining`}
                          </Badge>
                        ) : (
                          <Badge
                            colorScheme="red"
                            display="flex"
                            justifyContent="center"
                            w="40px"
                          >
                            Full
                          </Badge>
                        )}
                        <Text fontSize="md" fontWeight="500" noOfLines="1">
                          {listing.website}
                        </Text>
                        <Text fontSize="md" color="gray.600">
                          {listing.type}
                        </Text>
                      </Stack>
                    </Flex>
                  </Link>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </>
      )}
    </>
  );
}
