import {
  Button,
  ButtonGroup,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { updateListing } from '../../utils/ListingUtils';
import ManageModal from './ManageModal';
import { BsThreeDotsVertical } from 'react-icons/bs';

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
            <Flex align="flex-end" justify="flex-end">
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BsThreeDotsVertical />}
                  variant="ghost"
                  w="5px"
                />

                <MenuList>
                  <MenuItem onClick={onEditOpen}> Edit</MenuItem>
                  <MenuItem onClick={onOpenDeleteOpen}>Delete</MenuItem>
                  <MenuItem onClick={handleCloseListing}>
                    Close Listing
                  </MenuItem>
                  <MenuItem onClick={onOpenManageOpen}>
                    Manage Participants
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

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
            <Flex align="flex-end" justify="flex-end">
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BsThreeDotsVertical />}
                  variant="ghost"
                  w="5px"
                />

                <MenuList>
                  <MenuItem onClick={onClosedDeleteOpen}>Delete</MenuItem>
                  <MenuItem onClick={handleOpenListing}>
                    Reopen Listing
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
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
