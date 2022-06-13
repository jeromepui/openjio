import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateReview } from '../../utils/ReviewUtils';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  Select,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

export default function EditReviewModal({
  isOpen,
  onClose,
  setShouldRefresh,
  review,
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      rating: review.rating,
      content: review.content,
    },
    mode: 'onTouched',
  });

  const onSubmit = async reviewData => {
    const updatedReview = {
      review_id: review.review_id,
      created_by: review.created_by,
      reviewer_username: review.reviewer_username,
      created_for: review.userId,
      rating: reviewData.rating,
      content: reviewData.content,
    };

    try {
      const { error: updateError } = await updateReview(
        review.review_id,
        updatedReview
      );
      if (updateError) throw updateError;
    } catch (error) {
      alert(error.message);
    } finally {
      onClose();
      setShouldRefresh(prev => !prev);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(null);
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit review</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Rating</FormLabel>
              <Select {...register('rating')} placeholder="Rate">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Review</FormLabel>
              <Textarea
                {...register('content')}
                placeholder="Leave a review..."
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
