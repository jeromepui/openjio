import { Box, Flex, Stack, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllOpenListings } from '../../utils/ListingUtils';


export default function Listings() {
  const [listings, setListings] = useState();

  useEffect(() => {
    const getListings = async () => {
      try {
        const { data, error } = await getAllOpenListings();
        if (error) throw error;
        setListings(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getListings();
  }, []);

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
                <Text fontSize="md" fontWeight="500">
                  Slots: {listing.slots}
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
