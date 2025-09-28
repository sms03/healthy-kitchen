import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { signInSchema, signUpSchema, profileUpdateSchema, SignInInput, SignUpInput, ProfileUpdateInput } from '@/lib/validation';
import { logSecurityEvent, SecurityEvents, getClientIP, getUserAgent, isRateLimited, clearRateLimit } from '@/lib/security';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signingOut: boolean;
  signUp: (data: SignUpInput) => Promise<{ error: any }>;
  signIn: (data: SignInInput) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: ProfileUpdateInput) => Promise<{ error: any }>;
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
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Reset signing out state when auth state changes
        if (event === 'SIGNED_OUT') {
          setSigningOut(false);
        }
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

  const signUp = async (data: SignUpInput) => {
    try {
      setLoading(true);
      
      // Validate input
      const validationResult = signUpSchema.safeParse(data);
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast.error(firstError.message);
        return { error: firstError };
      }

      const { email, password, username, fullName } = validationResult.data;
      
      // Rate limiting
      const rateLimitKey = `signup:${email}`;
      if (isRateLimited(rateLimitKey, 3, 15 * 60 * 1000)) {
        toast.error('Too many signup attempts. Please wait 15 minutes before trying again.');
        return { error: new Error('Rate limited') };
      }
      
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
        // Log security event for failed signup
        await logSecurityEvent({
          action: SecurityEvents.AUTH_SIGN_UP,
          resource: 'auth',
          resourceId: email,
          ipAddress: await getClientIP(),
          userAgent: getUserAgent()
        });

        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Please sign in instead.');
        } else if (error.message.includes('Invalid email')) {
          toast.error('Please enter a valid email address.');
        } else if (error.message.includes('Password')) {
          toast.error('Password does not meet security requirements.');
        } else {
          toast.error(error.message || 'Failed to create account. Please try again.');
        }
        return { error };
      }

      // Clear rate limit on successful signup
      clearRateLimit(rateLimitKey);
      
      // Log successful signup attempt
      setTimeout(async () => {
        await logSecurityEvent({
          action: SecurityEvents.AUTH_SIGN_UP,
          resource: 'auth',
          resourceId: email,
          ipAddress: await getClientIP(),
          userAgent: getUserAgent()
        });
      }, 0);

      toast.success('Account created successfully! Please check your email to verify your account.');
      return { error: null };
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (data: SignInInput) => {
    try {
      setLoading(true);
      
      // Validate input
      const validationResult = signInSchema.safeParse(data);
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast.error(firstError.message);
        return { error: firstError };
      }

      const { email, password } = validationResult.data;
      
      // Rate limiting
      const rateLimitKey = `signin:${email}`;
      if (isRateLimited(rateLimitKey, 5, 15 * 60 * 1000)) {
        toast.error('Too many login attempts. Please wait 15 minutes before trying again.');
        return { error: new Error('Rate limited') };
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Log security event for failed signin
        await logSecurityEvent({
          action: SecurityEvents.AUTH_SIGN_IN,
          resource: 'auth',
          resourceId: email,
          ipAddress: await getClientIP(),
          userAgent: getUserAgent()
        });

        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please try again.');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Please check your email and click the confirmation link before signing in.');
        } else if (error.message.includes('Too many requests')) {
          toast.error('Too many login attempts. Please wait a few minutes before trying again.');
        } else {
          toast.error(error.message || 'Failed to sign in. Please try again.');
        }
        return { error };
      }

      // Clear rate limit on successful signin
      clearRateLimit(rateLimitKey);
      
      // Log successful signin
      setTimeout(async () => {
        await logSecurityEvent({
          action: SecurityEvents.AUTH_SIGN_IN,
          resource: 'auth',
          resourceId: email,
          ipAddress: await getClientIP(),
          userAgent: getUserAgent()
        });
      }, 0);

      toast.success('Signed in successfully!');
      return { error: null };
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setSigningOut(true);
      
      // Log security event for signout
      if (user) {
        setTimeout(async () => {
          await logSecurityEvent({
            action: SecurityEvents.AUTH_SIGN_OUT,
            resource: 'auth',
            resourceId: user.email || user.id,
            ipAddress: await getClientIP(),
            userAgent: getUserAgent()
          });
        }, 0);
      }
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        toast.error('Failed to sign out. Please try again.');
        return;
      }

      // Clear local state
      setUser(null);
      setSession(null);
      
      // Clear any stored tokens
      localStorage.clear();
      
      toast.success('Signed out successfully!');
      
      // Let the calling component handle navigation
      // Components can use window.location.href = '/' if needed
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error('An unexpected error occurred while signing out.');
    } finally {
      setSigningOut(false);
    }
  };

  const updateProfile = async (updates: ProfileUpdateInput) => {
    try {
      if (!user) {
        return { error: new Error('No user logged in') };
      }

      setLoading(true);

      // Validate input
      const validationResult = profileUpdateSchema.safeParse(updates);
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast.error(firstError.message);
        return { error: firstError };
      }

      const validatedUpdates = validationResult.data;

      const { error } = await supabase
        .from('profiles')
        .update({
          ...validatedUpdates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile. Please try again.');
        return { error };
      }

      // Log security event for profile update
      setTimeout(async () => {
        await logSecurityEvent({
          action: SecurityEvents.PROFILE_UPDATE,
          resource: 'profile',
          resourceId: user.id,
          ipAddress: await getClientIP(),
          userAgent: getUserAgent()
        });
      }, 0);

      toast.success('Profile updated successfully!');
      return { error: null };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('An unexpected error occurred while updating profile.');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signingOut,
      signUp,
      signIn,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};