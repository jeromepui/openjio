import { Button, Heading, Image, Text } from '@chakra-ui/react';

export default function SgRequests() {
  return (
    <>
      <Heading size="xl">Manage join listing requests </Heading>
      <Text fontSize="lg">
        You can view requests to join a listing you created under Request tab in
        dashboard. <br /> <br />
        <Image
          src="../../../request-tab.jpg"
          alt="Request tab of the dashboard"
        />
        To allow the requester to join the stated listing, click on
        <Button
          bg="#02CECB"
          color="white"
          _hover={{
            cursor: 'initial',
          }}
          _active={{}}
          size="sm"
          mx="10px"
        >
          Accept
        </Button>
        . This adds the user into the shopping group of the listing. On the
        contrary, clicking on
        <Button
          colorScheme="red"
          _hover={{ cursor: 'initial' }}
          _active={{}}
          mx="10px"
          size="sm"
        >
          Decline
        </Button>
        removes the requests. <br /> <br />
        Clicking on
        <Button _hover={{ cursor: 'initial' }} _active={{}} mx="10px" size="sm">
          View Profile
        </Button>
        will redirect you to the requester’s profile page.
      </Text>
    </>
  );
}
