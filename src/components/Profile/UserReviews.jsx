import { useState, useEffect } from 'react';
import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getUserReviews } from '../../utils/ReviewUtils';

export default function UserReviews({ shouldRefresh }) {
  const { id: userId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const { data, error } = await getUserReviews(userId);
        if (error) throw error;

        setReviews(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getReviews();
  }, [shouldRefresh, userId]);

  return (
    <Stack>
      {reviews ? (
        <Text>No reviews</Text>
      ) : (
        reviews?.map((review, index) => (
          <HStack boxShadow="lg" key={index} rounded="lg">
            <Avatar name="testing" />
            <Stack
              textAlign={{ base: 'center', md: 'left' }}
              mt={{ base: 4, md: 0 }}
            >
              <HStack>
                <Text
                  color="teal.500"
                  fontSize="lg"
                  fontWeight="bold"
                  noOfLines="1"
                >
                  {review.reviewer_username}
                </Text>
                <Text fontSize="md" noOfLines="1" display="inline-block">
                  rating: {review.rating}
                </Text>
              </HStack>
              <Text fontSize="md" h="auto">
                {review.content}
              </Text>
            </Stack>
          </HStack>
        ))
      )}
    </Stack>
  );
}
