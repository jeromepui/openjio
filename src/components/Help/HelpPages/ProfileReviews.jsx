import React from 'react';
import { Heading, Text, Image, Button } from '@chakra-ui/react';

export default function ProfileReviews() {
  return (
    <>
      <Heading size="xl">Rate and review </Heading>
      <Text fontSize="xl">
        Users may rate and review all OpenJio users apart from themselves. They
        may do so via the profile page of the to-be-reviewed user. <br /> <br />
        On the profile page of another user, one may find the button
        <Button
          _hover={{ cursor: 'initial' }}
          _active={{}}
          ml="1%"
          mr="1%"
          size="sm"
        >
          Leave a review
        </Button>
        under the user's avatar. <br /> <br />
        <Image
          src="../../../user-info-column.jpg"
          alt="Leftmost column in profile page that carries the Leave a review button"
        />
        <br /> <br />
        To leave a review, click on the button and a form will pop up. Users may
        choose to leave only a rating.
        <br /> <br />
        <Image
          src="../../../leave-review-modal.jpg"
          alt="A modal review form"
        />
      </Text>
    </>
  );
}
