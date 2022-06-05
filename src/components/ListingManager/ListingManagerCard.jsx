import { Box, Stack, Text, WrapItem } from '@chakra-ui/react';
import ListingCardActions from './ListingCardActions';

export default function ManagerListingCard({ category, listing }) {
  return (
    <WrapItem>
      <Box w="300px" h="200px" boxShadow="lg" p="2" rounded="lg">
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
          <Text fontSize="md" fontWeight="500" my="1">
            Slots: {listing.slots}
          </Text>
          <Text color="gray.500" my="2">
            {listing.type}
          </Text>
          <ListingCardActions category={category} listing={listing} />
        </Stack>
      </Box>
    </WrapItem>
  );
}
