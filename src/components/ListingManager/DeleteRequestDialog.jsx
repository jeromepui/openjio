import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
  ButtonGroup,
} from '@chakra-ui/react';
import { deleteRequest } from '../../utils/RequestUtils';

export default function DeleteRequestDialog({
  isOpen,
  onClose,
  cancelRef,
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
        title: 'Request deleted!',
        description: `We've deleted ${request.requester_username}'s request`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      setShouldRefresh(prev => !prev);
      onClose();
    }
  };
  return (
    <>
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
              Your listing does not have any slot left! Delete this request
              instead?
            </AlertDialogBody>
            <AlertDialogFooter>
              <ButtonGroup>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
