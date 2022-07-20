import React from 'react';
import { Heading, Text, Image, Icon } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function ListingsChangeStatus() {
  return (
    <>
      <Heading size="xl">Change listing status</Heading>
      <Text fontSize="xl">
        Listings have two statuses: <b>open</b> (available for public view and
        users may request to join them) or <b>closed</b> (hidden from the public
        and users cannot request to join them). One can toggle the status of a
        listing between <b>open</b> and <b>closed</b> in the dashboard. <br />
        <br />
        To close an <b>open</b> listing, click on the menu button{' '}
        <Icon as={BsThreeDotsVertical} ml="8px" mr="8px" /> in the top right
        corner of the listing's card under Open tab in the dashboard. A menu
        will appear as such:
        <br /> <br />
        <Image
          src="../../../listing-action-menu.jpg"
          alt="Action menu of a listing card in the dashboard"
        />
        <br />
        Click on <i>Close Listing</i> to close the listing. <br />
        <br />
        Similarly, to reopen a <b>closed</b> listing, navigate to the Closed tab
        in the dashboard, select the menu button of the listing's card and click
        on <i>Reopen Listing</i>.
      </Text>
    </>
  );
}
