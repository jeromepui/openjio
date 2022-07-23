import React from 'react';
import { Heading, Text, Image, Icon } from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';

export default function ProfileViewOwn() {
  return (
    <>
      <Heading size="xl">View own profile</Heading>
      <Text fontSize="xl">
        To open up your own profile, simple access the control center by
        clicking on <Icon as={MdSettings} ml="8px" mr="8px" /> and select <i>View
        profile</i> under the drop-down menu. <br /> <br />
        Your profile page should look something like this. By default, the
        Reviews tab is selected and you may find all reviews and ratings other
        users have left you here.
        <br /> <br />
        <Image
          src="../../../profile-page-reviews.jpg"
          alt="Profile page with Reviews tab open"
        />
        Under Listings, you can find all of your <b>open</b> listings instead.
        <br />
        <br />
        <Image
          src="../../../profile-page-listings.jpg"
          alt="Profile page with Listings tab open"
        />
      </Text>
    </>
  );
}
