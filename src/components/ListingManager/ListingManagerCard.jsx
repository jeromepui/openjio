import { Badge, Flex, Stack, Text } from '@chakra-ui/react';
import ListingCardActions from './ListingCardActions';

export default function ListingManagerCard({
  category,
  listing,
  setShouldRefresh,
}) {
  const { title, website, remaining_slots, type } = listing;

  return (
    <Flex boxShadow="lg" h="200px" justify="space-between" p="4" rounded="lg">
      <Stack alignContent="left">
        <Text fontSize="2xl" fontWeight="700" noOfLines="1">
          {title}
        </Text>
        {remaining_slots > 0 ? (
          <Badge
            colorScheme="green"
            display="flex"
            justifyContent="center"
            w="140px"
          >
            {remaining_slots === 1
              ? '1 slot remaining'
              : `${remaining_slots} slots remaining`}
          </Badge>
        ) : (
          <Badge
            colorScheme="red"
            display="flex"
            justifyContent="center"
            w="40px"
          >
            Full
          </Badge>
        )}
        <Text fontSize="md" fontWeight="500" noOfLines="1">
          {website}
        </Text>
        <Text color="gray.600" fontSize="md">
          {type}
        </Text>
      </Stack>
      <ListingCardActions
        category={category}
        listing={listing}
        setShouldRefresh={setShouldRefresh}
      />
    </Flex>
  );
}
