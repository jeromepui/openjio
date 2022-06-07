import { Button } from '@chakra-ui/react';

export default function RequestButton({ handleRequest, joined, requested }) {
  if (joined) {
    return (
      <Button isDisabled type="submit" width={['auto', '20%']}>
        Joined
      </Button>
    );
  }
  if (requested) {
    return (
      <Button isDisabled type="submit" width={['auto', '20%']}>
        Requested
      </Button>
    );
  }
  return (
    <Button
      bg="#02CECB"
      color="white"
      _hover={{
        background: '#06837F',
      }}
      onClick={handleRequest}
      type="submit"
      width={['auto', '20%']}
    >
      Request to join listing
    </Button>
  );
}
