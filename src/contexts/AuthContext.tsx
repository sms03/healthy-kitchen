import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { full_name?: string; username?: string; profile_image_url?: string }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username: string, fullName: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username,
            full_name: fullName
          }
        }
      });

      if (error) {
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account."
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in."
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('Starting sign out process...');
      
      // Clear local state first
      setSession(null);
      setUser(null);
      
      // Clear localStorage
      localStorage.removeItem('supabase.auth.token');
      
      // Try to sign out from Supabase - don't throw error if session doesn't exist
      try {
        await supabase.auth.signOut();
        console.log('Supabase signOut completed');
      } catch (supabaseError) {
        console.log('Supabase signOut failed (expected if session already expired):', supabaseError);
        // Don't throw - we still want to complete the local cleanup
      }
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out."
      });
      
      console.log('Redirecting to home page...');
      
      // Force redirect to home page
      window.location.replace('/');
      
    } catch (error: any) {
      console.error('Sign out error:', error);
      
      // Even if there's an error, clear local state and redirect
      setSession(null);
      setUser(null);
      localStorage.removeItem('supabase.auth.token');
      
      toast({
        title: "Signed Out",
        description: "You have been signed out."
      });
      
      // Still redirect even if there was an error
      window.location.replace('/');
    }
  };

  const updateProfile = async (updates: { full_name?: string; username?: string; profile_image_url?: string }) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Update Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated."
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Update Error",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
