import { supabase } from '../supabase';

// Get all reviews from a user
export const getUserReviews = async userId => {
  const { data, error } = await supabase
    .from('reviews')
    .select()
    .eq('created_for', userId);
  return { data, error };
};

// Get all ratings of a user
export const getUserRatings = async userId => {
  const { data, error, count } = await supabase
    .from('reviews')
    .select('rating', { count: 'exact' })
    .eq('created_for', userId);
  return { data, error, count };
};

// Returns reviews
export const getReviewsBy = async userId => {
  const { data, error } = await supabase
    .from('reviews')
    .select()
    .eq('created_by', userId);
  return { data, error };
};

// Update a review
export const updateReview = async (reviewId, reviewUpdates) => {
  const { error } = await supabase
    .from('reviews')
    .update(reviewUpdates)
    .eq('review_id', reviewId);
  return { error };
};

// Delete a review
export const deleteReview = async reviewId => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('review_id', reviewId);
  return { error };
};
