import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import { deleteRequest } from '../../utils/RequestUtils';

export default function DeleteRequestDialog({
  cancelRef,
  isOpen,
  onClose,
  request,
  setShouldRefresh,
}) {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      const { error: deleteRequestError } = await deleteRequest(
        request.request_id
      );
      if (deleteRequestError) throw deleteRequestError;
    } catch (error) {
      alert(error.message);
    } finally {
      toast({
        description: `We've deleted ${request.requester_username}'s request`,
        duration: 4000,
        isClosable: true,
        status: 'success',
        title: 'Request deleted!',
      });
      setShouldRefresh(prev => !prev);
      onClose();
    }
  };
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Slots Filled
          </AlertDialogHeader>
          <AlertDialogBody>
            Your listing does not have any slots left! Delete this request
            instead?
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup>
              <Button onClick={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
