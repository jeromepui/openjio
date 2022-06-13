import { Button, ButtonGroup, useDisclosure } from '@chakra-ui/react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { updateListing } from '../../utils/ListingUtils';
import ManageModal from './ManageModal';

export default function ListingCardActionBar({
  category,
  listing,
  setShouldRefresh,
}) {
  const { listing_id } = listing;

  // Open listings - Delete
  const {
    isOpen: isOpenDeleteOpen,
    onOpen: onOpenDeleteOpen,
    onClose: onOpenDeleteClose,
  } = useDisclosure();

  // Open listings - Edit
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  // Closed listings - Delete
  const {
    isOpen: isClosedDeleteOpen,
    onOpen: onClosedDeleteOpen,
    onClose: onClosedDeleteClose,
  } = useDisclosure();

  // Open listings - Manage participants
  const {
    isOpen: isOpenManageOpen,
    onOpen: onOpenManageOpen,
    onClose: onOpenManageClose,
  } = useDisclosure();

  const handleOpenListing = async () => {
    try {
      const { error } = await updateListing(listing_id, {
        status: 'open',
      });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setShouldRefresh(prev => !prev);
    }
  };

  const handleCloseListing = async () => {
    try {
      const { error } = await updateListing(listing_id, {
        status: 'closed',
      });
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
            <Button onClick={onOpenManageOpen}>Manage Participants</Button>
            <EditModal
              isOpen={isEditOpen}
              listing={listing}
              onClose={onEditClose}
              setShouldRefresh={setShouldRefresh}
            />
            <DeleteModal
              isOpen={isOpenDeleteOpen}
              listing={listing}
              onClose={onOpenDeleteClose}
              setShouldRefresh={setShouldRefresh}
            />
            <ManageModal
              isOpen={isOpenManageOpen}
              listing={listing}
              onClose={onOpenManageClose}
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
