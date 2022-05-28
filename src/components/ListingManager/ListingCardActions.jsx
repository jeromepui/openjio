import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { supabase } from '../../supabase';

export default function ListingCardActionBar({ category, listing }) {
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
        id: listing.id,
        status: 'open',
      };

      const { error } = await supabase.from('listings').upsert(openListing, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      window.location.reload();
    }
  };

  const handleCloseListing = async () => {
    try {
      const closeListing = {
        id: listing.id,
        status: 'closed',
      };

      const { error } = await supabase.from('listings').upsert(closeListing, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      window.location.reload();
    }
  };

  const renderActions = category => {
    switch (category) {
      case 'open':
        return (
          <HStack justify="flex-start">
            <Button colorScheme="teal" onClick={onEditOpen}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={onOpenDeleteOpen}>
              Delete
            </Button>
            <Button onClick={handleCloseListing}>Close Listing</Button>
            <DeleteModal
              isOpen={isOpenDeleteOpen}
              listing={listing}
              onClose={onOpenDeleteClose}
            />
            <EditModal
              isOpen={isEditOpen}
              listing={listing}
              onClose={onEditClose}
            />
          </HStack>
        );

      case 'closed':
        return (
          <HStack justify="flex-start">
            <Button colorScheme="red" onClick={onClosedDeleteOpen}>
              Delete
            </Button>
            <Button onClick={handleOpenListing}>Reopen Listing</Button>
            <DeleteModal
              isOpen={isClosedDeleteOpen}
              listing={listing}
              onClose={onClosedDeleteClose}
            />
          </HStack>
        );

      case 'joined':
        return (
          <HStack justify="flex-start">
            <Button>Unjoin</Button>
          </HStack>
        );

      case 'followed':
        return (
          <HStack justify="flex-start">
            <Button>Unfollow</Button>
            <Button>Join Listing</Button>
          </HStack>
        );
      default:
    }
  };

  return renderActions(category);
}
