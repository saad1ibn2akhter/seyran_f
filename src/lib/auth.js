import { supabase } from "@/lib/supabase";

/**
 * Sign in an existing user.
 * Returns { error } — null on success.
 */
export async function signIn({ email, password }) {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return { error };
}

/**
 * Register a new user and create their profile row.
 * Returns { error } — null on success.
 * alright everything makes sense now , 
 */
export async function signUp({ email, password, name, school, yearGroup }) {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
        return { error: error ?? new Error("Sign up failed") };
    }

    const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        email,
        school,
        year_group: yearGroup,
        role: "student",
    });

    if (profileError) {
        return { error: profileError };
    }

    return { error: null };
}

export async function signOut()

{
    const {error} = await supabase.auth.signOut();
    return {error};
}
