import { Badge, Box, Stack, Text } from '@chakra-ui/react';
import ListingCardActions from './ListingCardActions';

export default function ListingManagerCard({
  category,
  listing,
  setShouldRefresh,
}) {
  const { title, website, remaining_slots, type } = listing;

  return (
    <Box boxShadow="lg" h="200px" p="4" rounded="lg">
      <Stack
        align={{ base: 'center', md: 'stretch' }}
        textAlign={{ base: 'center', md: 'left' }}
        mt={{ base: 4, md: 0 }}
      >
        <Text color="teal.500" fontSize="lg" fontWeight="bold" noOfLines="1">
          {title}
        </Text>
        <Text fontSize="md" fontWeight="500" my="1" noOfLines="1">
          {website}
        </Text>
        {remaining_slots > 0 ? (
          <Badge
            colorScheme="green"
            justifyContent="center"
            variant="subtle"
            display="flex"
            w="50%"
          >
            {remaining_slots === 1
              ? '1 slot remaining'
              : `${remaining_slots} slots remaining`}
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
          {type}
        </Text>
        <ListingCardActions
          category={category}
          listing={listing}
          setShouldRefresh={setShouldRefresh}
        />
      </Stack>
    </Box>
  );
}
