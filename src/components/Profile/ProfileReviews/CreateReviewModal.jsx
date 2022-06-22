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
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../supabase';
import { getUserProfile } from '../../../utils/UserUtils';

export default function CreateReviewModal({
  isOpen,
  onClose,
  setShouldRefresh,
}) {
  const auth = useAuth();
  const { id: userId } = useParams();
  let username;
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = async reviewData => {
    const reviewId = uuidv4();
    try {
      const { data, error } = await getUserProfile(auth.user.id);
      if (error) throw error;
      username = data.username;
    } catch (error) {
      alert(error.message);
    }

    const review = {
      content: reviewData.content,
      created_by: auth.user.id,
      created_for: userId,
      rating: reviewData.rating,
      review_id: reviewId,
      reviewer_username: username,
    };
    try {
      const { error: reviewError } = await supabase
        .from('reviews')
        .insert(review);
      if (reviewError) throw reviewError;
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
          <ModalHeader>Leave a review</ModalHeader>
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
            <Button
              _hover={{
                background: '#06837F',
              }}
              bg="#02CECB"
              color="white"
              onClick={() => setShouldRefresh(prev => !prev)}
              type="submit"
            >
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
