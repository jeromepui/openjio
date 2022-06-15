import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import ReviewCardActions from './ReviewCardActions';

export default function EditReviewsDrawer({
  isOpen,
  onClose,
  setShouldRefresh,
  reviews,
  username,
}) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="lg">
      <DrawerOverlay />
      <DrawerContent overflowY="scroll">
        <DrawerHeader>Your reviews for {username}</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          {reviews?.map((review, index) => (
            <Flex
              boxShadow="lg"
              justify="space-between"
              key={index}
              p="4"
              rounded="lg"
            >
              <Stack alignContent="left">
                <Text
                  color="teal.500"
                  fontSize="lg"
                  fontWeight="bold"
                  noOfLines="1"
                >
                  {review.reviewer_username}
                </Text>
                <Text fontSize="md" fontWeight="500" noOfLines="1">
                  Rating: {review.rating}
                </Text>
                <Text fontSize="md" h="auto">
                  {review.content}
                </Text>
              </Stack>
              <ReviewCardActions
                review={review}
                setShouldRefresh={setShouldRefresh}
              />
            </Flex>
          ))}
        </DrawerBody>
        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
}
