import { Badge, Box, Stack, Text,} from '@chakra-ui/react';
import ListingCardActions from './ListingCardActions';

export default function ListingManagerCard({
  category,
  listing,
  setShouldRefresh,
}) {
  const { title, website, remaining_slots, type } = listing;

  return (
    <Box _hover={{boxShadow: "lg"}} p="3" rounded="lg" h="200px">
      <Stack
        align={{ base: 'center', md: 'stretch' }}
        textAlign={{ base: 'center', md: 'left' }}
        mt={{ base: 4, md: 0 }}
        h="80%"
        w={{ base: '70vw', md: '200px' }}
      >
        <Text
          color="black"
          fontSize="lg"
          fontWeight="bold"
          noOfLines="2"
          maxW="80%"
        >
          {title}
        </Text>

        {remaining_slots > 0 ? (
          <Badge
            colorScheme="green"
            justifyContent="center"
            variant="subtle"
            display="flex"
            w="140px"
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
        <Text fontSize="sm" fontWeight="500" noOfLines="1">
          {website}
        </Text>

        <Text fontSize="xs" color="gray.600">
          {type}
        </Text>
      </Stack>

      <ListingCardActions
        category={category}
        listing={listing}
        setShouldRefresh={setShouldRefresh}
      />
    </Box>
  );
}
