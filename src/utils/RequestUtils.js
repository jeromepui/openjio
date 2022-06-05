import { supabase } from '../supabase';

// Check if user requested to join listing
export const userJoinedListing = async (listingId, userId) => {
  const { data: requestData, error: requestError } = await supabase
    .from('requests')
    .select()
    .match({
      listing_id: listingId,
      requester_id: userId,
    });
  return { requestData, requestError };
};
