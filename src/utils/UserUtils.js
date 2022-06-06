import { supabase } from '../supabase';

// Get user profile
export const getUserProfile = async userId => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('profile_id', userId)
    .single();
  return { data, error };
};
