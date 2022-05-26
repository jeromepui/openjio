import React from 'react';
import { HStack, Button } from '@chakra-ui/react';

function renderSwitch(param) {
  switch (param) {
    case 'open':
      return (
        <HStack justify="flex-end">
          <Button onClick={() => {}}>Edit</Button>
          <Button onClick={() => {}}>Move to Closed</Button>
          <Button onClick={() => {}}>Delete</Button>
        </HStack>
      );
    case 'closed':
      return (
        <HStack justify="flex-end">
          <Button onClick={() => {}}>Reopen</Button>
          <Button onClick={() => {}}>Delete</Button>
        </HStack>
      );
    case 'joined':
      return (
        <HStack justify="flex-end">
          <Button onClick={() => {}}>Unjoin</Button>
        </HStack>
      );

    case 'followed':
      return (
        <HStack justify="flex-end">
          <Button onClick={() => {}}>Unfollow</Button>
          <Button onClick={() => {}}>Join listing</Button>
          <Button onClick={() => {}} disabled={true}>
            Contact owner
          </Button>
        </HStack>
      );
    default:
  }
}

export default function ListingCardActionBar(props) {
  return renderSwitch(props.category);
}
