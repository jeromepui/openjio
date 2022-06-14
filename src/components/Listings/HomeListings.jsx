import {
  Badge,
  Box,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Spinner,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllOpenListings } from '../../utils/ListingUtils';
import { getUserProfile } from '../../utils/UserUtils';

export default function Listings() {
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);

        const { data, error } = await getAllOpenListings();
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
  }, []);

  return (
    <>
      {loading ? (
        <Flex grow="1" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ sm: '2', md: '4' }} mx="4" p="2" spacing="5">
          {listings?.map((listing, index) => (
            <Box key={index}>
              <Link to={`/listing/${listing.listing_id}`}>
                <Flex
                  justifyContent={{ base: 'center', md: 'left' }}
                  _hover={{ boxShadow: 'lg' }}
                  h="200px"
                  w={{ base: '70vw', md: '200px' }}
                  p="2"
                  rounded="lg"
                >
                  <Stack
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
                      noOfLines="2"
                      maxW="90%"
                      textOverflow="ellipsis"
                    >
                      {listing.title}
                    </Text>

                    {listing.remaining_slots > 0 ? (
                      <Badge
                        colorScheme="green"
                        justifyContent="center"
                        variant="subtle"
                        display="flex"
                        w="140px"
                      >
                        {listing.remaining_slots === 1
                          ? '1 slot remaining'
                          : `${listing.remaining_slots} slots remaining`}
                      </Badge>
                    ) : (
                      <Badge
                        colorScheme="red"
                        justifyContent="center"
                        variant="subtle"
                        display="flex"
                        w="10"
                      >
                        {' '}
                        FULL{' '}
                      </Badge>
                    )}

                    <Text fontSize="sm" fontWeight="500" noOfLines="1">
                      {listing.website}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
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
  );
}
