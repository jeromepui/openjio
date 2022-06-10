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

export default function DeleteModal({ isOpen, listing, onClose, setShouldRefresh }) {
  const handleDelete = async () => {
    try {
      const { error: listingError } = await supabase
        .from('listings')
        .delete()
        .eq('listing_id', listing.listing_id);
      if (listingError) throw listingError;

      const { error: requestError } = await supabase
        .from('requests')
        .delete()
        .eq('listing_id', listing.listing_id);
      if (requestError) throw requestError;

      const { error: messageError } = await supabase
        .from('messages')
        .delete()
        .eq('listing_id', listing.listing_id);
      if (messageError) throw messageError;

      const { error: listingParticipantError } = await supabase
        .from('listing_participants')
        .delete()
        .eq('listing_id', listing.listing_id);
      if (listingParticipantError) throw listingParticipantError;
    } catch (error) {
      alert(error.message);
    } finally {
      onClose();
      setShouldRefresh((prev) => !prev)
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
