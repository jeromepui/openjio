import { Button, Flex } from '@chakra-ui/react';

export default function RequestButton({
  handleRequest,
  joined,
  requested,
  isFull,
}) {
  if (joined) {
    return (
      <Flex justify="center">
        <Button isDisabled w="400px" type="submit">
          Joined
        </Button>
      </Flex>
    );
  }

  if (requested) {
    return (
      <Flex justify="center">
        <Button isDisabled w="400px" type="submit">
          Requested
        </Button>
      </Flex>
    );
  }

  if (isFull) {
    return (
      <Flex justify="center">
        <Button isDisabled w="400px" type="submit">
          No slots remaining
        </Button>
      </Flex>
    );
  }

  return (
    <Flex justify="center">
      <Button
        bg="#02CECB"
        color="white"
        _hover={{
          background: '#06837F',
        }}
        w="400px"
        onClick={handleRequest}
        type="submit"
      >
        Request to join listing
      </Button>
    </Flex>
  );
}
