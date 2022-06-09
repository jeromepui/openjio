import { supabase } from "../supabase";

// Get all reviews from a user
export const getUserReviews = async userId => {
    const { data, error } = await supabase
    .from('reviews')
    .select()
    .eq('created_for', userId);
    return { data, error }
}

// Get all ratings of a user 
export const getUserRatings = async userId => {
    const { data, error, count } = await supabase
    .from('reviews')
    .select("rating", { count: 'exact' })
    .eq('created_for', userId)

    return { data, error, count }
}