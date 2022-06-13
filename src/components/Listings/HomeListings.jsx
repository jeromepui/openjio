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
import {
  getAllOpenListings,
  getListingOwnerUsername,
} from '../../utils/ListingUtils';

export default function Listings() {
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);

        const { data, error } = await getAllOpenListings();
        if (error) throw error;

        setListings(data);
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
        <SimpleGrid columns={{ sm: '1', md: '4' }} mx="4" p="2" spacing="10">
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
      )}
    </>
  );
}
