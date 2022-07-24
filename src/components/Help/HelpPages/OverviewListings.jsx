import {
  Heading,
  TableContainer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';

export default function OverviewListings() {
  return (
    <>
      <Heading size="xl">Listings and shopping groups</Heading>
      <Text fontSize="lg">
        A listing is simply an open invitation created by OpenJio users for
        others to join their shopping group. <br />
        <br />
        Each listing consist of information provided by users, which includes:{' '}
        <br />
      </Text>
      <TableContainer maxW="70vw">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Field</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Title</Td>
              <Td>A short hook for the listing.</Td>
            </Tr>
            <Tr>
              <Td>Website</Td>
              <Td>A URL to the shopping site.</Td>
            </Tr>
            <Tr>
              <Td>Slots available</Td>
              <Td>
                Number of users allowed to join the listing. <br />
                This will be updated as the slots are filled up.
              </Td>
            </Tr>
            <Tr>
              <Td>Type of listing</Td>
              <Td>
                Bundle deals (e.g. Buy One Get One deals) or Minimum spend
              </Td>
            </Tr>
            <Tr>
              <Td>Amount required for free delivery</Td>
              <Td>
                This field will only appear for minimum spend listings.
                <br />
                It refers to the amount still required to meet minimum spending
                requirements for free
                <br />
                delivery (or other promotions if available).
              </Td>
            </Tr>
            <Tr>
              <Td>Description (optional)</Td>
              <Td>
                More detailed information regarding the listing. <br />
                For example, a user may include product details of the item on
                sale etc.
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <br />

      <Text fontSize="lg">
        <Heading size="md">Listing status</Heading>
        Listings also have two statuses: <b>open</b> (available for public view
        and users may request to join them) or <b>closed</b> (hidden from the
        public and users cannot request to join them). <br />
        <br />
        <Heading size="md">What is a shopping group?</Heading>
        Shopping group refers to the group of participants you have approved to
        join your listing. <br />
        Each listing is connected to one shopping group, and each shopping group
        has a group chat automatically created for them.
      </Text>
    </>
  );
}
