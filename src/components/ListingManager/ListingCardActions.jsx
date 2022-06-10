import { Button, ButtonGroup, useDisclosure } from '@chakra-ui/react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { updateListing } from '../../utils/ListingUtils';

export default function ListingCardActionBar({
  category,
  listing,
  setShouldRefresh,
}) {
  const { listing_id } = listing;
  const {
    isOpen: isClosedDeleteOpen,
    onOpen: onClosedDeleteOpen,
    onClose: onClosedDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteOpen,
    onOpen: onOpenDeleteOpen,
    onClose: onOpenDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const handleOpenListing = async () => {
    try {
      const openListing = {
        status: 'open',
      };

      const { error } = await updateListing(listing_id, openListing);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setShouldRefresh(prev => !prev);
    }
  };

  const handleCloseListing = async () => {
    try {
      const closeListing = {
        status: 'closed',
      };

      const { error } = await updateListing(listing_id, closeListing);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setShouldRefresh(prev => !prev);
    }
  };

  const renderActions = category => {
    switch (category) {
      case 'open':
        return (
          <>
            <ButtonGroup>
              <Button
                bg="#02CECB"
                color="white"
                _hover={{
                  background: '#02CECB',
                }}
                onClick={onEditOpen}
              >
                Edit
              </Button>
              <Button
                bg="red.500"
                color="white"
                _hover={{
                  background: 'red',
                }}
                onClick={onOpenDeleteOpen}
              >
                Delete
              </Button>
              <Button onClick={handleCloseListing}>Close Listing</Button>
            </ButtonGroup>
            <DeleteModal
              isOpen={isOpenDeleteOpen}
              listing={listing}
              onClose={onOpenDeleteClose}
              setShouldRefresh={setShouldRefresh}
            />
            <EditModal
              isOpen={isEditOpen}
              listing={listing}
              onClose={onEditClose}
              setShouldRefresh={setShouldRefresh}
            />
          </>
        );

      case 'closed':
        return (
          <>
            <ButtonGroup>
              <Button colorScheme="red" onClick={onClosedDeleteOpen}>
                Delete
              </Button>
              <Button onClick={handleOpenListing}>Reopen Listing</Button>
            </ButtonGroup>
            <DeleteModal
              isOpen={isClosedDeleteOpen}
              listing={listing}
              onClose={onClosedDeleteClose}
            />
          </>
        );

      default:
    }
  };

  return renderActions(category);
}
