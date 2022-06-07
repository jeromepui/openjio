import React from 'react';
import {
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import ReviewModal from "../Reviews/ReviewModal.jsx"

export default function UserInfo(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box px="6" w={['auto', '20%']}>
      <Avatar
        name={props.profile?.username}
        src={props.profile?.avatar_url}
        size={['xl', '2xl']}
        marginBottom={['0.2rem']}
      />
      <Stack spacing="0">
        <Text fontSize={['xl', '2xl']}>{props.profile?.username}</Text>
        <Text fontSize={['lg', 'xl']}>rating: 3.3</Text>
      </Stack>
      <Button onClick={onOpen}>Leave a review</Button>
      <ReviewModal onClose={onClose} isOpen={isOpen}/>
    </Box>
  );
}
