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

// Get username of listing owner
export const getListingOwnerUsername = async userId => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('profile_id', userId)
    .single();
  return { data, error };
};
