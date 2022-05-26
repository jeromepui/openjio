import {
  Alert,
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import Layout from '../components/Layout/MainNavBar/Layout';

export default function ListingPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    getListing();
  }, []);

  const getListing = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from('listings')
        .select()
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setListing(data);
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
        <Box p="4">
          <Stack spacing="4">
            <Heading fontWeight="700" fontSize="4xl">
              {listing?.title}
            </Heading>
            <Text fontSize="2xl" fontWeight="500">
              Listing Details
            </Text>
            <List spacing={4}>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  Website:
                </Text>{' '}
                {listing.website}
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
                {listing.created_by_username}
              </ListItem>
            </List>
            <Button
              bg="#0FA3B1"
              color="white"
              _hover={{
                bg: 'blue.500',
              }}
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
