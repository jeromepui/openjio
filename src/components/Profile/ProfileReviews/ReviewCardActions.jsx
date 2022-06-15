import { ButtonGroup, IconButton, useDisclosure } from '@chakra-ui/react';
import { MdDelete, MdEdit } from 'react-icons/md';
import DeleteReviewModal from './DeleteReviewModal';
import EditReviewModal from './EditReviewModal';

export default function ReviewCardActions({ review, setShouldRefresh }) {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <>
      <ButtonGroup>
        <IconButton
          aria-label="Edit review"
          icon={<MdEdit />}
          onClick={onEditOpen}
        />
        <IconButton
          aria-label="Delete reviews"
          icon={<MdDelete />}
          onClick={onDeleteOpen}
        />
      </ButtonGroup>
      <EditReviewModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        review={review}
        setShouldRefresh={setShouldRefresh}
      />
      <DeleteReviewModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        review={review}
        setShouldRefresh={setShouldRefresh}
      />
    </>
  );
}
