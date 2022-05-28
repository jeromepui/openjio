import {
  Alert,
  Box,
  Button,
  Heading,
  Link,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';

export default function ListingPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getListing();
  }, []);

  const getListing = async () => {
    try {
      setLoading(true);
      const { data: listingData, error } = await supabase
        .from('listings')
        .select()
        .eq('id', id)
        .single();

      if (error) throw error;

      setListing(listingData);

      const { data: userData } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', listingData?.created_by)
        .single();

      setUser(userData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

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
            <List spacing={6}>
              <ListItem>
                <Text fontWeight="bold">Website:</Text>{' '}
                <Link href={listing.website}>{listing.website}</Link>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Type:</Text> {listing.type}
              </ListItem>
              {listing.type === 'Min. Spend' && (
                <ListItem>
                  <Text fontWeight="bold">
                    Amount Required For Free Delivery:
                  </Text>{' '}
                  ${listing.required_spend}
                </ListItem>
              )}
              <ListItem>
                <Text fontWeight="bold">Slots Available:</Text> {listing.slots}
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Description:</Text>{' '}
                {listing.description
                  ? listing.description
                  : 'No description provided'}
              </ListItem>
              <ListItem>
                <Text fontWeight={'bold'}>Created by:</Text>{' '}
                {user?.username
                  ? user.username
                  : 'User has not created a username'}
              </ListItem>
            </List>
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
