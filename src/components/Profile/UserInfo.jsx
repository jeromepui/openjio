import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Text,
  Stack,
  Button,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import CreateReviewModal from './CreateReviewModal.jsx';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { getReviewsBy, getUserRatings } from '../../utils/ReviewUtils.js';
import EditReviewsOverviewDrawer from './EditReviewsOverviewDrawer.jsx';

export default function UserInfo({
  avatarUrl,
  setShouldRefresh,
  shouldRefresh,
  username,
}) {
  const auth = useAuth();
  const { id: userId } = useParams();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isOverviewOpen,
    onOpen: onOverviewOpen,
    onClose: onOverviewClose,
  } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [reviewsBy, setReviewsBy] = useState([]);

  const renderEditReviewButton = () => {
    if (userId === auth.user.id) {
      return <></>;
    } else {
      return reviewsBy.length === 0 ? (
        <Tooltip
          shouldWrapChildren
          label="You haven't created any reviews for this user."
          fontSize="sm"
        >
          <Button disabled>Edit review(s)</Button>
        </Tooltip>
      ) : (
        <>
          <Button onClick={onOverviewOpen}>Edit review</Button>
          <EditReviewsOverviewDrawer
            onClose={onOverviewClose}
            isOpen={isOverviewOpen}
            setShouldRefresh={setShouldRefresh}
            username={username}
            reviews={reviewsBy}
          />
        </>
      );
    }
  };

  useEffect(() => {
    const getRatings = async () => {
      try {
        const { data, error, count } = await getUserRatings(userId);
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

    const getReviews = async () => {
      try {
        const { data, error } = await getReviewsBy(auth.user.id);
        if (error) throw error;
        setReviewsBy(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getRatings();
    getReviews();
  }, [userId, auth.user.id, shouldRefresh]);

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
        <></>
      ) : (
        <Button onClick={onCreateOpen}>Leave a review</Button>
      )}
      <CreateReviewModal
        onClose={onCreateClose}
        isOpen={isCreateOpen}
        setShouldRefresh={setShouldRefresh}
      />
      {renderEditReviewButton()}
    </Stack>
  );
}
