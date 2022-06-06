import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function RequestsTab() {
  const auth = useAuth();
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('requests')
          .select()
          .eq('listing_owner_id', auth.user.id);
        if (error) throw error;

        setRequests(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getRequests();
  }, [auth.user.id]);

  const handleApprove = async request => {};

  const handleDeny = async request => {
    try {
      const { error } = await supabase
        .from('requests')
        .delete()
        .eq('request_id', request.request_id);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      window.location.reload();
    }
  };

  return (
    <Wrap mx="4" p="2" spacing="30px">
      {requests?.length > 0 ? (
        requests.map((request, index) => {
          return (
            <WrapItem key={index}>
              <Box w="300px" h="200px" boxShadow="lg" p="2" rounded="lg">
                <Stack
                  align={{ base: 'center', md: 'stretch' }}
                  textAlign={{ base: 'center', md: 'left' }}
                  mt={{ base: 4, md: 0 }}
                >
                  <Text color="teal.500" fontSize="lg" fontWeight="bold">
                    Request To Join
                  </Text>
                  <Text fontSize="md" fontWeight="500" my="1" noOfLines="1">
                    {request.listing_title}
                  </Text>
                  <Text fontSize="md" fontWeight="500" my="1" noOfLines="1">
                    Requested by:
                  </Text>
                  <Text fontSize="md" my="1" noOfLines="1">
                    {request.requester_username}
                  </Text>
                  <HStack justify="flex-start">
                    <Button
                      bg="#02CECB"
                      color="white"
                      _hover={{
                        background: '#06837F',
                      }}
                      onClick={() => handleApprove(request)}
                    >
                      Approve
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeny(request)}
                    >
                      Deny
                    </Button>
                    <Link to={`/profile/${request.requester_id}`}>
                      <Button>View Profile</Button>
                    </Link>
                  </HStack>
                </Stack>
              </Box>
            </WrapItem>
          );
        })
      ) : (
        <Heading fontSize="2xl">You do not have any requests.</Heading>
      )}
    </Wrap>
  );
}
