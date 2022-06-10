import { Badge, Flex, Stack, Text } from '@chakra-ui/react';
import ListingCardActions from './ListingCardActions';

export default function ListingManagerCard({
  category,
  listing,
  setShouldRefresh,
}) {
  return (
    <Flex w="auto" h="200px" boxShadow="lg" p="4" rounded="lg">
        <Stack
          align={{ base: 'center', md: 'stretch' }}
          textAlign={{ base: 'center', md: 'left' }}
          mt={{ base: 4, md: 0 }}
        >
          <Text color="teal.500" fontSize="lg" fontWeight="bold" noOfLines="1">
            {listing.title}
          </Text>
          <Text fontSize="md" fontWeight="500" my="1" noOfLines="1">
            {listing.website}
          </Text>
          {listing.remaining_slots > 0 ? (
            <Badge
              colorScheme="green"
              justifyContent="center"
              variant="subtle"
              display="flex"
              w="50%"
            >
              {listing.remaining_slots} slot(s) remaining{' '}
            </Badge>
          ) : (
            <Badge
              colorScheme="red"
              justifyContent="center"
              variant="subtle"
              display="flex"
              w="10"
            >
              {' '}
              Full{' '}
            </Badge>
          )}
          <Text color="gray.500" my="2">
            {listing.type}
          </Text>
          <ListingCardActions
            category={category}
            listing={listing}
            setShouldRefresh={setShouldRefresh}
          />
        </Stack>
      </Flex>
  );
}
