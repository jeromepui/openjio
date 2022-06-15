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
        _hover={{
          background: '#06837F',
        }}
        bg="#02CECB"
        color="white"
        onClick={handleRequest}
        type="submit"
        w="400px"
      >
        Request to join listing
      </Button>
    </Flex>
  );
}
