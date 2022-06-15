import {
  Avatar,
  Box,
  Flex,
  HStack,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserReviews } from '../../../utils/ReviewUtils';
import { getUserProfile } from '../../../utils/UserUtils';

export default function UserReviews({ shouldRefresh }) {
  const { id: userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const { data, error } = await getUserReviews(userId);
        if (error) throw error;

        const boostedData = [];

        for (const review of data) {
          const { data: user, error: userError } = await getUserProfile(
            review.created_by
          );
          if (userError) throw userError;

          const boostedReview = {
            ...review,
            avatarUrl: user.avatar_url,
            username: user.username,
          };

          boostedData.push(boostedReview);
        }

        setReviews(boostedData);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [shouldRefresh, userId]);

  return (
    <>
      {loading ? (
        <Flex grow="1" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex direction="column">
          {!reviews ? (
            <Text>No reviews</Text>
          ) : (
            reviews?.map((review, index) => (
              <Box key={index} w="80vw" mb="4">
                <Flex
                  boxShadow="lg"
                  justifyContent={{ sm: 'center', md: 'start' }}
                  p="4"
                  rounded="lg"
                >
                  <Stack alignContent="left">
                    <HStack>
                      <Avatar
                        name={review.username}
                        size="sm"
                        src={`https://mtwxkbwufcrhoaevfoxk.supabase.co/storage/v1/object/public/${review.avatarUrl}`}
                      />
                      <Text
                        color="teal.400"
                        fontSize="lg"
                        fontWeight="700"
                        noOfLines="1"
                      >
                        {review.reviewer_username}
                      </Text>
                    </HStack>
                    <Text fontSize="md" fontWeight="500" noOfLines="1">
                      Rating: {review.rating}
                    </Text>
                    <Text fontSize="md">{review.content}</Text>
                  </Stack>
                </Flex>
              </Box>
            ))
          )}
        </Flex>
      )}
    </>
  );
}
