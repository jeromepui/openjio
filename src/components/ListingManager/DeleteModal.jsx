import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { supabase } from '../../supabase';

export default function DeleteModal({ isOpen, listing, onClose }) {
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .match({ id: listing.id });

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      onClose();
      window.location.reload(false);
    }
  };

  return (
    <Modal
      blockScrollOnMount={true}
      closeOnOverlayClick={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete listing</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this listing?</Text>
          <Text fontWeight="500">This action cannot be undone.</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr="3" onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
