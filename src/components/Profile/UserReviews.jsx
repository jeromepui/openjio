import React, { useState, useEffect } from 'react';
import { Text, Avatar, HStack, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const reviews = [];

export default function UserReviews() {
  // const { id: userId } = useParams();
  // const [ reviews, setReviews ] = useState();

  // useEffect(() =>
  //   const getReviews = async () => {
  //     try()
  //   }

  // )
  return (
    <Stack>
      {reviews?.map((review, index) => (
        <HStack
          boxShadow="md"
          rounded="lg"
          padding={{ base: '1.0rem' }}
          spacing={{ base: '1rem' }}
          key={index}
        >
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
                {review.created_by}
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
      ))}
    </Stack>
  );
}
