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
    <SimpleGrid columns={{ sm: '1', md: '4' }} p="2" spacing="6">
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
                <Text fontSize="2xl" fontWeight="700" noOfLines="1" w="200px">
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
                    FULL
                  </Badge>
                )}
                <Text fontSize="md" fontWeight="500" noOfLines="1">
                  {listing.website}
                </Text>
                <Text color="gray.600">{listing.type}</Text>
              </Stack>
            </Flex>
          </Link>
        </Box>
      ))}
    </SimpleGrid>
  );
}
