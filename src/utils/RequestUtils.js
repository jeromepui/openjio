import { supabase } from '../supabase';

// Get requests by listing owner
export const getRequestsByListingOwner = async ownerId => {
  const { data, error } = await supabase
    .from('requests')
    .select()
    .eq('listing_owner_id', ownerId);
  return { data, error };
};

// Check if user requested to join listing
export const userJoinedListing = async (listingId, userId) => {
  const { data, error } = await supabase.from('requests').select().match({
    listing_id: listingId,
    requester_id: userId,
  });
  return { data, error };
};

// Update request
export const updateRequest = async (listingId, requestUpdates) => {
  const { data, error } = await supabase
    .from('requests')
    .update(requestUpdates)
    .eq('listing_id', listingId);
  return { data, error };
};

// Delete request
export const deleteRequest = async requestId => {
  const { data, error } = await supabase
    .from('requests')
    .delete()
    .eq('request_id', requestId);
  return { data, error };
};

// Delete requests by listing
export const deleteRequestsByListing = async listingId => {
  const { error } = await supabase
    .from('requests')
    .delete()
    .eq('listing_id', listingId);
  return { error };
};
