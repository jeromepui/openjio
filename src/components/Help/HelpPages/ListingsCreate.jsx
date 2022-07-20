import React from 'react';
import {
  Button,
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
  Image,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

export default function ListingsCreate() {
  return (
    <>
      <Heading size="xl">Create new listings</Heading>
      <Text fontSize="xl">
        To create a new listing, simply click on
        <Button
          size="sm"
          bg="white"
          color="#06837F"
          borderRadius="8px"
          border="solid"
          borderColor="#06837F"
          _hover={{ cursor: 'initial' }}
          _active={{}}
          ml="8px"
          mr="8px"
          leftIcon={<MdAdd />}
        >
          New Listing
        </Button>
        in the navigation bar, and you will be brought to a form that looks
        something like this:
        <br />
        <br />
        <Image src="../../../new-listing-form.jpg" alt="New listing form" />
        <br />
        Below are the requirements OpenJio impose for each fields:
        <br />
      </Text>
      <TableContainer maxW="70vw">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Field</Th>
              <Th>Requirement</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td> Listing Title</Td>
              <Td> Must be between 1-64 characters (inclusive)</Td>
            </Tr>
            <Tr>
              <Td>Website</Td>
              <Td>Must be a valid URL link</Td>
            </Tr>
            <Tr>
              <Td>Type</Td>
              <Td>Must select one of the two options</Td>
            </Tr>
            <Tr>
              <Td>Slots available</Td>
              <Td>Must be a number between 1-10 (inclusive)</Td>
            </Tr>
            <Tr>
              <Td>$ Required for Free Delivery</Td>
              <Td> Must at least be $1</Td>
            </Tr>
            <Tr>
              <Td>Description</Td>
              <Td>No requirement</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <br />

      <Text fontSize="xl">
        Upon clicking
        <Button
          _hover={{ cursor: 'initial' }}
          _active={{}}
          ml="1%"
          mr="1%"
          size="sm"
          w="10%"
        >
          Submit
        </Button>
        button at the end of the form, the new listing will be created and you
        may find it under Open tab of the dashboard, as all new listings are by
        default open.
      </Text>
    </>
  );
}
