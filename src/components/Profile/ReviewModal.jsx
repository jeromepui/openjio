import React, { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabase';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../utils/UserUtils';

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

export default function ReviewModal({ isOpen, onOpen, onClose, setShouldRefresh }) {
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
      username = data.username
    } catch (error) {
      alert(error.message);
    }

    const review = {
      review_id: reviewId,
      created_by: auth.user.id,
      reviewer_username: username,
      created_for: userId,
      rating: reviewData.rating,
      content: reviewData.content,
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
      setShouldRefresh((prev) => !prev)
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
