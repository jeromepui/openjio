import {
  Alert,
  Box,
  Button,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListing, getListingOwnerUsername } from '../utils/ListingUtils';

export default function ListingPage() {
  const { id: listingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getListingData = async () => {
      try {
        setLoading(true);

        const { listingData, error } = await getListing(listingId);
        if (error) throw error;
        setListing(listingData);

        const userData = await getListingOwnerUsername(listingData.created_by);
        setUser(userData);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getListingData();
  }, [listingId]);

  return (
    <>
      {loading ? (
        <Alert status="info">Loading...</Alert>
      ) : (
        <Box px="6" py="4">
          <Stack spacing="4">
            <Heading fontWeight="700" fontSize="4xl">
              {listing.title}
            </Heading>
            <Text fontSize="2xl" fontWeight="500">
              Listing Details
            </Text>
            <Text fontWeight="bold">Website:</Text>{' '}
            <Link href={listing.website} noOfLines="1">
              {listing.website}
            </Link>
            <Text fontWeight="bold">Type:</Text>
            <Text>{listing.type}</Text>
            {listing.type === 'Min. Spend' && (
              <>
                <Text fontWeight="bold">
                  Amount Required For Free Delivery:
                </Text>
                <Text>${listing.required_spend}</Text>
              </>
            )}
            <Text fontWeight="bold">Slots Available:</Text>
            <Text> {listing.slots}</Text>
            <Text fontWeight="bold">Description:</Text>{' '}
            <Text>
              {listing.description
                ? listing.description
                : 'No description provided'}
            </Text>
            <Text fontWeight={'bold'}>Created by:</Text>{' '}
            <Text>
              {user?.username
                ? user.username
                : 'User has not created a username'}
            </Text>
            <Button
              colorScheme="teal"
              isDisabled
              type="submit"
              width={['auto', '20%']}
            >
              Join Listing (Work in Progress)
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
}
