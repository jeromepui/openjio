import { supabase } from '../supabase';

// Get single listing
export const getListing = async listingId => {
  const { data, error } = await supabase
    .from('listings')
    .select()
    .eq('listing_id', listingId)
    .single();
  return { data, error };
};

// Get all open listings
export const getAllOpenListings = async () => {
  const { data, error } = await supabase
    .from('listings')
    .select()
    .eq('status', 'open');
  return { data, error };
};

// Get all open listings of a user
export const getUserListings = async (userId, status) => {
  const { data, error } = await supabase
    .from('listings')
    .select()
    .match({ created_by: userId, status: status });
  return { data, error };
};

// Get username of listing owner
export const getListingOwnerUsername = async userId => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('profile_id', userId)
    .single();
  return { data, error };
};

// Insert listing
export const addListing = async listing => {
  const { error } = await supabase.from('listings').insert(listing);
  return { error };
};

// Update listing
export const updateListing = async (listingId, listingUpdates) => {
  const { error } = await supabase
    .from('listings')
    .update(listingUpdates)
    .eq('listing_id', listingId);
  return { error };
};

// Delete listing
export const deleteListing = async listingId => {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('listing_id', listingId);
  return { error };
};

// Check if a listing has remaining slots
export const checkSlotsAvailability = async listingId => {
  const { data, error } = await supabase
    .from('listings')
    .select()
    .eq('listing_id', listingId)
    .single();
  const result = data?.remaining_slots > 0;
  return { result, error };
};

// Increase available slots for specified listing by 1
export const increaseSlots = async listingId => {
  const { data, error } = await supabase.rpc('increment', {
    row_id: listingId,
  });
  return { data, error };
};

// Decrease available slots for specified listing by 1
export const decreaseSlots = async listingId => {
  const { data, error } = await supabase.rpc('decrement', {
    row_id: listingId,
  });
  return { data, error };
};
