import { Heading, Image, Text } from '@chakra-ui/react';

export default function OverviewIntro() {
  return (
    <>
      <Heading size="xl">Introduction</Heading>
      <Text fontSize="lg">
        OpenJio is a platform where users may seek group buy partners for their
        latest shopping hauls. It is a consumer-to-consumer application, which
        means users have complete autonomy over who to partner with.
        <br />
        <br />
        <Heading size="md">How to use OpenJio?</Heading>
        Start by simply creating a listing with details of your latest shopping
        venture. Not comfortable with hosting your own listings? You may browse
        listings posted by other users on OpenJio and request to join any you
        like.
        <br />
        <br />
        Here is a more complete picture of what a user might look like in
        OpenJio:
        <Image src="simple-user-flow.jpg" alt="Simple OpenJio user flow" />
      </Text>
    </>
  );
}
