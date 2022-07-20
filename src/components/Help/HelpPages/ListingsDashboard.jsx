import React from 'react';
import {
  Stack,
  Heading,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Image,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function ListingsDashboard() {
  return (
    <>
      <Heading size="xl">Dashboard</Heading>
      <Text fontSize="xl">
        OpenJio has a centralized dashboard for users to manage all listings
        they have created or joined. To access the dashboard, simply click on
         Dashboard on the navigation bar. <br />
        <br />
        <Image src="../../../openjio-dashboard.jpg" alt="OpenJio's dashboard" />
        There are currently four tabs under the dashboard, which are Open,
        Closed, Joined, and Requests. <br />
        <br />
      </Text>
      <TableContainer maxW="70vw">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Tab</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Open</Td>
              <Td>Contains listings of open status created by the user</Td>
            </Tr>
            <Tr>
              <Td>Closed</Td>
              <Td>Contains listings of closed status created by the user</Td>
            </Tr>
            <Tr>
              <Td>Joined</Td>
              <Td>
                Contains listings user has joined after receiving approval to
                join
              </Td>
            </Tr>
            <Tr>
              <Td>Requests</Td>
              <Td>
                Contains requests sent by other users to join a listing created
                by the user
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <br />

      <Text fontSize="xl">
        Under each tab, listings of the selected category will appear as cards.{' '}
        <br />
        <br />
        To view actions available for the listing, select the menu button
        <Icon
          as={BsThreeDotsVertical}
          ml="8px"
          mr="8px"
        />
        in the top right corner of the card.
      </Text>
    </>
  );
}
