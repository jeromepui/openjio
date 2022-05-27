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
import Layout from '../components/Layout/Layout';

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
      let { data: listingData, error } = await supabase
        .from('listings')
        .select()
        .eq('id', id)
        .single();

      if (error) throw error;

      if (listingData) {
        setListing(listingData);
      }

      let { data: userData } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', listingData?.created_by)
        .single();

      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
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
            <List spacing={4}>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  Website:
                </Text>{' '}
                <Link href={listing.website}>{listing.website}</Link>
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  Type:
                </Text>{' '}
                {listing.type}
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  Slots Available:
                </Text>{' '}
                {listing.slots}
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  Description:
                </Text>{' '}
                {listing.description}
              </ListItem>
              <ListItem>
                <Text as={'span'} fontWeight={'bold'}>
                  Created by:
                </Text>{' '}
                {user.username}
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
    </Layout>
  );
}
