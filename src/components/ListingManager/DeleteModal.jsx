import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { deleteParticipantsByListing } from '../../utils/ListingParticipantUtils';
import { deleteListing } from '../../utils/ListingUtils';
import { deleteMessagesByListing } from '../../utils/MessageUtils';
import { deleteRequestsByListing } from '../../utils/RequestUtils';

export default function DeleteModal({
  isOpen,
  listing,
  onClose,
  setShouldRefresh,
}) {
  const { listing_id } = listing;

  const handleDelete = async () => {
    try {
      const { error: listingError } = await deleteListing(listing_id);
      if (listingError) throw listingError;

      const { error: requestError } = await deleteRequestsByListing(listing_id);
      if (requestError) throw requestError;

      const { error: messageError } = await deleteMessagesByListing(listing_id);
      if (messageError) throw messageError;

      const { error: participantError } = await deleteParticipantsByListing(
        listing_id
      );
      if (participantError) throw participantError;
    } catch (error) {
      alert(error.message);
    } finally {
      onClose();
      setShouldRefresh(prev => !prev);
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
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" mr="3" onClick={handleDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
