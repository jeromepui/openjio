import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { deleteReview } from '../../../utils/ReviewUtils';

export default function DeleteReviewModal({
  isOpen,
  onClose,
  review,
  setShouldRefresh,
}) {
  const handleClose = async () => {
    try {
      const { error: deleteError } = await deleteReview(review.review_id);
      if (deleteError) throw deleteError;
    } catch (error) {
      alert(error.message);
    } finally {
      onClose();
      setShouldRefresh(prev => !prev);
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
          <Button colorScheme="red" onClick={handleClose}>
            Confirm
          </Button>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
