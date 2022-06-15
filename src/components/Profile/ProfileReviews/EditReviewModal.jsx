import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateReview } from '../../../utils/ReviewUtils';

export default function EditReviewModal({
  isOpen,
  onClose,
  review,
  setShouldRefresh,
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
      content: reviewData.content,
      created_by: review.created_by,
      created_for: review.userId,
      rating: reviewData.rating,
      review_id: review.review_id,
      reviewer_username: review.reviewer_username,
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
              <Select {...register('rating')} placeholder="Select rating">
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
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
