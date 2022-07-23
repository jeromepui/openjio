import React from 'react';
import { Heading, Text, Image, IconButton } from '@chakra-ui/react';
import { MdEdit, MdDelete } from 'react-icons/md';

export default function ProfileEditReviews() {
  return (
    <>
      <Heading size="xl">Edit or remove reviews </Heading>
      <Text fontSize="xl">
        To edit reviews previously made for a user, click on Edit reviews
        beneath the Leave a review. A drawer will pop up from the side, showing
        all reviews you have made for the user.
        <br /> <br />
        <Image
          src="../../../reviews-drawer.jpg"
          alt="A drawer showing all reviews made for a user"
        />
        <br /> <br />
        To edit a rating or a review, click on the edit button{' '}
        <IconButton
          as={MdEdit}
          _hover={{ cursor: 'initial' }}
          _active={{}}
          ml="0.5%"
          mr="0.5%"
          size="sm"
          p="0.5%"
        />
        in top right corner of the review card you would like to make changes
        to. A form will pop up for input.
        <br /> <br />
        <Image
          src="../../../edit-review-modal.jpg"
          alt="Modal form for editing a review"
        />
        <br /> <br />
        To delete a rating or review, click on the delete button{' '}
        <IconButton
          as={MdDelete}
          _hover={{ cursor: 'initial' }}
          _active={{}}
          ml="0.5%"
          mr="0.5%"
          size="sm"
          p="0.5%"
        />
        instead. A modal will pop up to ask for confirmation.
        <br /> <br />
        <Image
          src="../../../delete-review-modal.jpg"
          alt="Modal to confirm review deletion"
        />
        <br /> <br />
        If no reviews have been created before for the user, the edit reviews
        button ill be disabled.
      </Text>
    </>
  );
}
