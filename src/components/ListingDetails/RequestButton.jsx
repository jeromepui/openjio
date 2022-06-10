import { Button } from '@chakra-ui/react';

export default function RequestButton({
  handleRequest,
  joined,
  requested,
  isFull,
}) {
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

  if (isFull) {
    return (
      <Button isDisabled type="submit" width={['auto', '20%']}>
        No slots remaining
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
      maxW="300px"
      onClick={handleRequest}
      type="submit"
    >
      Request to join listing
    </Button>
  );
}
