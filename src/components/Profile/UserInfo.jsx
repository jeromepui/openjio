import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import ReviewModal from './ReviewModal.jsx';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { getUserRatings } from '../../utils/ReviewUtils.js';

export default function UserInfo(props) {
  const auth = useAuth();
  const { id: userId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);

  const isOwnProfile = auth.user.id === userId;

  const renderButton = status => {
    return status ? (
      <Tooltip
        hasArrow
        label="You can't leave reviews for yourself."
        shouldWrapChildren
      >
        <Button onClick={onOpen} isDisabled>
          Leave a review
        </Button>
      </Tooltip>
    ) : (
      <Button onClick={onOpen}>Leave a review</Button>
    );
  };

  useEffect(() => {
    const getRatings = async id => {
      try {
        const { data, error, count } = await getUserRatings(id);
        if (error) throw error;
        let ratingSum = 0;
        if (count !== 0) {
          for (const e of data) {
            ratingSum += e['rating'];
          }
          setRating(Math.round(ratingSum / count));
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getRatings(userId);
  }, [userId, props.shouldRefresh]);

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
        {rating === 0 ? (
          <Text fontSize={['md', 'lg']}> This user has no ratings yet. </Text>
        ) : (
          <Text fontSize={['lg', 'xl']}> rating: {rating} </Text>
        )}
      </Stack>

      {renderButton(isOwnProfile)}

      <ReviewModal
        onClose={onClose}
        isOpen={isOpen}
        setShouldRefresh={props.setShouldRefresh}
      />
    </Box>
  );
}
