import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type UserRole = 'admin' | 'user';

export const useUserRole = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }

    const fetchUserRoles = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching user roles:', error);
          setError('Failed to load user roles');
          return;
        }

        const userRoles = data?.map(item => item.role as UserRole) || [];
        setRoles(userRoles);
      } catch (err) {
        console.error('Error fetching user roles:', err);
        setError('Failed to load user roles');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, [user]);

  const hasRole = (role: UserRole): boolean => {
    return roles.includes(role);
  };

  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  const isUser = (): boolean => {
    return hasRole('user');
  };

  return {
    roles,
    loading,
    error,
    hasRole,
    isAdmin,
    isUser
  };
};