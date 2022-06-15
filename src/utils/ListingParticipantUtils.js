import { supabase } from '../supabase';

// Get all listings a user is participating in
export const getListingsByParticipant = async participantId => {
  const { data, error } = await supabase
    .from('listing_participants')
    .select()
    .eq('participant_id', participantId);
  return { data, error };
};

// Get all participants of a listing
export const getParticipantsByListing = async listingId => {
  const { data, error } = await supabase
    .from('listing_participants')
    .select()
    .eq('listing_id', listingId);
  return { data, error };
};

// Get joined listings of a participant
export const getJoinedListings = async participantId => {
  const { data, error } = await supabase
    .from('listing_participants')
    .select()
    .match({ is_owner: false, participant_id: participantId });
  return { data, error };
};

// Insert listing participant
export const addParticipant = async participant => {
  const { error } = await supabase
    .from('listing_participants')
    .insert(participant);
  return { error };
};

// Update listing participant
export const updateParticipant = async (listingId, updates) => {
  const { error } = await supabase
    .from('listing_participants')
    .update(updates)
    .eq('listing_id', listingId);
  return { error };
};

// Leave listing
export const leaveListing = async (listingId, participantId) => {
  const { error } = await supabase
    .from('listing_participants')
    .delete()
    .match({ listing_id: listingId, participant_id: participantId });
  return { error };
};

// Delete listing participants by listing
export const deleteParticipantsByListing = async listingId => {
  const { error } = await supabase
    .from('listing_participants')
    .delete()
    .eq('listing_id', listingId);
  return { error };
};
