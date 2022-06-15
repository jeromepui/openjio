import {
  Avatar,
  Button,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateReviewModal from './ProfileReviews/CreateReviewModal.jsx';
import EditReviewsDrawer from './ProfileReviews/EditReviewsDrawer.jsx';
import { useAuth } from '../../contexts/AuthContext';
import { getReviewsBy, getUserRatings } from '../../utils/ReviewUtils.js';

export default function ProfileInfo({
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
          <Button disabled>Edit reviews</Button>
        </Tooltip>
      ) : (
        <>
          <Button onClick={onOverviewOpen}>Edit reviews</Button>
          <EditReviewsDrawer
            isOpen={isOverviewOpen}
            onClose={onOverviewClose}
            reviews={reviewsBy}
            setShouldRefresh={setShouldRefresh}
            username={username}
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
    <Stack align="center" p="4">
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
