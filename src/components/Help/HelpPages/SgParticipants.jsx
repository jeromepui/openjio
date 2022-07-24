import { Button, Heading, Icon, Image, Text } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function SgParticipants() {
  return (
    <>
      <Heading size="xl">Manage participants </Heading>
      <Text fontSize="lg">
        To remove a participant from a shopping group, navigate to either Open
        or Closed tab in the dashboard to find its respective listing. Click on
        the menu button <Icon as={BsThreeDotsVertical} ml="8px" mr="8px" /> in
        the top right corner of the card and select <i>Manage participants</i>.
        A list of the shopping group participants will pop up. <br />
        <br />
        <Image
          src="../../../manage-participants.jpg"
          alt="Participant's manager of a shopping group in dashboard"
        />{' '}
        <br />
        <br />
        Selecting{' '}
        <Button
          colorScheme="red"
          _hover={{
            cursor: 'initial',
          }}
          _active={{}}
          size="sm"
          mx="10px"
        >
          Remove
        </Button>{' '}
        behind a user’s name will kick the user out of the shopping group.
      </Text>
    </>
  );
}
