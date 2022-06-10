import React, { useEffect, useState } from 'react';
import {
  Avatar,
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

export default function UserInfo({
  avatarUrl,
  setShouldRefresh,
  shouldRefresh,
  username,
}) {
  const auth = useAuth();
  const { id: userId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);

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
  }, [userId, shouldRefresh]);

  return (
    <Stack align="center" p="4" w="20%">
      <Avatar
        name={username}
        src={
          avatarUrl
            ? `https://mtwxkbwufcrhoaevfoxk.supabase.co/storage/v1/object/public/${avatarUrl}`
            : ''
        }
        size="2xl"
      />
      <Text fontSize="2xl">{username}</Text>
      {rating === 0 ? (
        <Text fontSize="md">No ratings yet.</Text>
      ) : (
        <Text fontSize="md">Rating: {rating}</Text>
      )}
      {userId === auth.user.id ? (
        <Tooltip
          label="You can't leave reviews for yourself."
          shouldWrapChildren
        >
          <Button onClick={onOpen} isDisabled>
            Leave a review
          </Button>
        </Tooltip>
      ) : (
        <Button onClick={onOpen}>Leave a review</Button>
      )}
      <ReviewModal
        onClose={onClose}
        isOpen={isOpen}
        setShouldRefresh={setShouldRefresh}
      />
    </Stack>
  );
}
