import React from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Text,
  Button,
} from '@chakra-ui/react';
import { deleteReview } from '../../utils/ReviewUtils';

export default function DeleteReviewModal({
  onClose,
  isOpen,
  setShouldRefresh,
  review,
}) {
  const handleClose = async () => {
    try {
      const { error: deleteError } = await deleteReview(review.review_id);
      if (deleteError) throw deleteError;
    } catch (error) {
      alert(error.message);
    } finally {
      onClose();
      setShouldRefresh(prev => !prev)
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this review?</Text>
          <Text fontWeight="500">This action cannot be undone.</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Confirm
          </Button>
          <Button variant="ghost">Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
