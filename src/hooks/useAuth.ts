import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Demo user for when Supabase is not configured
const DEMO_USER: User = {
  id: 'demo-user-001',
  email: 'dawg@uga.edu',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as User;

export function useAuth() {
  const [user, setUser] = useState<User | null>(
    isSupabaseConfigured() ? null : DEMO_USER
  );
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string) => {
    if (!isSupabaseConfigured()) {
      setUser(DEMO_USER);
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    return { error };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  // Let user skip login and play locally (no cross-device sync)
  const playWithoutSignIn = () => {
    setUser(DEMO_USER);
  };

  const isDemoMode = !isSupabaseConfigured() || user?.id === DEMO_USER.id;

  return { user, loading, signIn, signOut, isDemoMode, playWithoutSignIn };
}
