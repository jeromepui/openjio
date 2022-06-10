import { Badge, Box, SimpleGrid, Stack, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserListings } from '../../utils/ListingUtils';

export default function UserListings() {
  const { id: userId } = useParams();
  const [listings, setListings] = useState();

  useEffect(() => {
    const getListings = async () => {
      try {
        const { data, error } = await getUserListings(userId, 'open');
        if (error) throw error;

        setListings(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getListings();
  }, [userId]);

  return (
    <SimpleGrid columns="4" mx="4" p="2" spacing="10">
      {listings?.map((listing, index) => (
        <Box key={index}>
          <Link to={`/listing/${listing.listing_id}`}>
            <Flex
              justifyContent={{ base: 'center', md: 'left' }}
              boxShadow="lg"
              minH="160px"
              minW={{ base: '80vw', md: '200px' }}
              p="2"
              rounded="lg"
            >
              <Stack
                textAlign={{ base: 'center', md: 'left' }}
                mt={{ base: 4, md: 0 }}
              >
                <Text
                  color="teal.500"
                  fontSize="lg"
                  fontWeight="bold"
                  noOfLines="1"
                >
                  {listing.title}
                </Text>
                <Text fontSize="md" fontWeight="500" noOfLines="1">
                  {listing.website}
                </Text>
                {listing.remaining_slots > 0 ? (
                  <Badge
                    colorScheme="green"
                    justifyContent="center"
                    variant="subtle"
                    display="flex"
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
                <Text color="gray.600">{listing.type}</Text>
              </Stack>
            </Flex>
          </Link>
        </Box>
      ))}
    </SimpleGrid>
  );
}
