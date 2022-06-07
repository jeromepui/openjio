import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

export default function ReviewModal({ isOpen, onOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm();
  const onSubmit = data => {
    console.log(data);
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
          <ModalHeader>Modal Title</ModalHeader>
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
                {...register('review')}
                placeholder="Leave a review..."
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit" onClick={onClose}>
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
