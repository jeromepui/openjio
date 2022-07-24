import { Button, Heading, Image, Text } from '@chakra-ui/react';

export default function ListingsLeave() {
  return (
    <>
      <Heading size="xl">Leave a listing</Heading>
      <Text fontSize="lg">
        To leave a listing, head to Joined tab under the dashboard and simply
        select{' '}
        <Button
          colorScheme="red"
          _active={{}}
          mx="10px"
          size="sm"
          _hover={{ cursor: 'initial' }}
        >
          Leave Listing
        </Button>{' '}
        on the listing card of interest. <br /> <br />
        <Image
          src="../../../joined-tab.jpg"
          alt="Joined tab under the dashboard"
        />
        Leaving a listing will remove the listing from the Joined tab.
      </Text>
    </>
  );
}
