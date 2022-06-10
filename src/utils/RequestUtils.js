import { supabase } from '../supabase';

// Check if user requested to join listing
export const userJoinedListing = async (listingId, userId) => {
  const { data, error } = await supabase.from('requests').select().match({
    listing_id: listingId,
    requester_id: userId,
  });
  return { data, error };
};

// Delete a request 
export const deleteRequest = async (requestId) => {
  const { data, error } = await supabase
  .from('requests')
  .delete()
  .eq('request_id', requestId);
  return { data, error }
}
