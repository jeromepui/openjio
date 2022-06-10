import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { supabase } from '../../supabase';

export default function ListingCardActionBar({
  category,
  listing,
  setShouldRefresh,
}) {
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

      const { error } = await supabase
        .from('listings')
        .update(openListing)
        .eq('listing_id', listing.listing_id);
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

      const { error } = await supabase
        .from('listings')
        .update(closeListing)
        .eq('listing_id', listing.listing_id);
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
          <HStack justify="flex-start">
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
                background: '#02CECB',
              }}
              onClick={onEditOpen}
            >
              Edit{' '}
            </Button>
            <Button
              bg="red"
              color="white"
              _hover={{
                background: 'red',
              }}
              onClick={onOpenDeleteOpen}
            >
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
