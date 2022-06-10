import { supabase } from '../supabase';

// Get messages by listing
export const getMessagesByListing = async listingId => {
  const { data, error } = await supabase
    .from('messages')
    .select()
    .eq('listing_id', listingId)
    .order('created_at');
  return { data, error };
};

// Insert message
export const sendMessage = async message => {
  const { error } = await supabase.from('messages').insert(message);
  return { error };
};

// Delete messages by listing
export const deleteMessagesByListing = async listingId => {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('listing_id', listingId);
  return { error };
};
