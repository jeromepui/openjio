import { Button, Heading, Text, Image } from '@chakra-ui/react';

export default function ListingsJoin() {
  return (
    <>
      <Heading size="xl">Join a listing</Heading>
      <Text fontSize="lg">
        A user can join a listing through the home page.
        <br />
        Click on a listing of interest on the home page and you will be brought
        to the details page of the listing.
        <br />
        <Image
          src="../../../listing-details-page.jpg"
          alt="Details page of a listing"
        />
        To join the listing, click on{' '}
        <Button
          _hover={{
            cursor: 'initial',
          }}
          _active={{}}
          bg="#02CECB"
          color="white"
          mx="10px"
          size="sm"
          w="300px"
        >
          Request to join listing
        </Button>
        at the bottom of the page. This will send a request to the listing owner
        for approval.
        <br />
        If you are approved by the owner to join the listing, the listing will
        appear under Joined tab under your dashboard.
        <br />
        <Image
          src="../../../joined-tab.jpg"
          alt="Joined tab under the dashboard"
        />
        <br />
        Note that a user will not be able to join a listing they have joined.
        The{' '}
        <Button
          _hover={{
            cursor: 'initial',
          }}
          _active={{}}
          bg="#02CECB"
          color="white"
          mx="10px"
          size="sm"
          w="300px"
        >
          Request to join listing
        </Button>{' '}
        button will be disabled for a listing a user has joined.
        <br />
        <br />
        Additionally, to prevent spams, OpenJio disables the{' '}
        <Button
          mx="10px"
          _hover={{
            cursor: 'initial',
          }}
          _active={{}}
          bg="#02CECB"
          color="white"
          w="300px"
          size="sm"
        >
          Request to join listing
        </Button>{' '}
        button once a request has been sent. The button will be reactivated once
        the owner of the listing has either approved or denied the previous
        request.
      </Text>
    </>
  );
}
