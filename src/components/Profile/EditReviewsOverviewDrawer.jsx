import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabase';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../utils/UserUtils';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
  Stack,
  useDisclosure,
  Text,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import EditReviewModal from './EditReviewModal';
import DeleteReviewModal from './DeleteReviewModal';

export default function EditReviewsOverviewDrawer({
  isOpen,
  onClose,
  setShouldRefresh,
  reviews,
  username,
}) {
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
    <Drawer isOpen={isOpen} onClose={onClose} size="lg">
      <DrawerOverlay />
      <DrawerContent overflowY="scroll">
        <DrawerHeader>Your reviews for {username}</DrawerHeader>
        <DrawerCloseButton />

        <DrawerBody>
          {reviews?.map((review, index) => (
            <Stack
              textAlign={{ base: 'center', md: 'left' }}
              mt={{ base: 4, md: 0 }}
              boxShadow="lg"
              borderRadius="10px"
              padding="1rem"
            >
              <Flex align="center">
                <>
                  <Text
                    color="teal.500"
                    fontSize="lg"
                    fontWeight="bold"
                    noOfLines="1"
                  >
                    {review.reviewer_username}
                  </Text>

                  <Text
                    fontSize="md"
                    noOfLines="1"
                    display="inline-block"
                    marginLeft="1rem"
                  >
                    rating: {review.rating}
                  </Text>
                </>
                <Spacer />
                <Flex gap="1em">
                  <IconButton
                    aria-label="Edit review"
                    icon={<FiEdit />}
                    onClick={onEditOpen}
                  />
                  <IconButton
                    aria-label="Delete reviews"
                    icon={<AiOutlineDelete />}
                    onClick={onDeleteOpen}
                  />
                </Flex>
              </Flex>
              <Text fontSize="md" h="auto">
                {review.content}
              </Text>
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
            </Stack>
          ))}
        </DrawerBody>
        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
}
