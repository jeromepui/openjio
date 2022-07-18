import React from 'react';
import { Stack, Heading, Text, Image } from '@chakra-ui/react';

export default function ListingsHome() {
  return (
    <Stack alignContent="flex-start" mt="1%" maxW="75vw">
      <Heading size="xl">Home</Heading>
      <Text fontSize="xl">
        The home page displays all <b>open</b> listings created by all OpenJio
        users.
        <br /> <br />
        <Image src="../../../homepage.jpg" alt="Home page of OpenJio" />
        <br /> Clicking on a listing will bring the user to the details page of
        the listing.
        <br />
        <br />
        <Image
          src="../../../listing-details-page.jpg"
          alt="Listing details page"
        />
      </Text>
    </Stack>
  );
}
