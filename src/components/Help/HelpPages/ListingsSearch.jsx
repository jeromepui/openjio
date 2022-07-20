import React from 'react';
import { Heading, Text, Image } from '@chakra-ui/react';

export default function ListingsSearch() {
  return (
    <>
      <Heading size="xl">Search listings</Heading>
      <Text fontSize="xl">
        To search for a listing, key in your search key in the search bar in the
        navigation bar. <br />
        <br /> <Image src="../../../searchbar.jpg" alt="Search bar" />
        <br />
        <br />
        The results will be displayed on the page as follows:
        <br />
        <br />
        <Image src="../../../search-results.jpg" alt="Search results page" />
        If there are no relevant results, the page will display a message.
        <br />
        <br />
        <Image
          src="../../../search-no-results.jpg"
          alt="No results message after searching"
        />
        Note that currently in OpenJio, the search function only matches the
        search key with whole words in the listing title (non-case sensitive).
      </Text>
    </>
  );
}
