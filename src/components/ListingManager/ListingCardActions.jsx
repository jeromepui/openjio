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
        listing_id: listing.listing_id,
        status: 'open',
      };

      const { error } = await supabase.from('listings').upsert(openListing);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      window.location.reload(false);
    }
  };

  const handleCloseListing = async () => {
    try {
      const closeListing = {
        listing_id: listing.listing_id,
        status: 'closed',
      };

      const { error } = await supabase.from('listings').upsert(closeListing);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      window.location.reload(false);
    }
  };

  const renderActions = category => {
    switch (category) {
      case 'open':
        return (
          <HStack justify="flex-start">
            <Button
              bg="#02CECB"
              color="white"
              _hover={{
                background: '#06837F',
              }}
              onClick={onEditOpen}
            >
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

      case 'requests':
        return (
          <HStack justify="flex-start">
            <Button
              bg="#02CECB"
              color="white"
              _hover={{
                background: '#06837F',
              }}
              onClick={onEditOpen}
            >
              Edit
            </Button>
            <Button colorScheme="red" onClick={onOpenDeleteOpen}>
              Delete
            </Button>
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
