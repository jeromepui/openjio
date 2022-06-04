import { Box, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
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
    <Wrap mx="4" p="2" spacing="40px">
      {listings?.map((listing, index) => (
        <WrapItem key={index}>
          <Link to={`/listing/${listing.listing_id}`}>
            <Box boxShadow="lg" w="200px" h="160px" p="2" rounded="lg">
              <Stack
                align={{ base: 'center', md: 'stretch' }}
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
            </Box>
          </Link>
        </WrapItem>
      ))}
    </Wrap>
  );
}
