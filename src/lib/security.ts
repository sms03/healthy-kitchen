import { supabase } from '@/integrations/supabase/client';

export interface SecurityEvent {
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
}

export const logSecurityEvent = async (event: SecurityEvent) => {
  try {
    const { error } = await supabase.rpc('log_security_event', {
      _action: event.action,
      _resource: event.resource,
      _resource_id: event.resourceId || null,
      _ip_address: event.ipAddress || null,
      _user_agent: event.userAgent || null
    });

    if (error) {
      console.error('Failed to log security event:', error);
    }
  } catch (err) {
    console.error('Error logging security event:', err);
  }
};

// Common security events
export const SecurityEvents = {
  AUTH_SIGN_IN: 'auth.sign_in',
  AUTH_SIGN_UP: 'auth.sign_up',
  AUTH_SIGN_OUT: 'auth.sign_out',
  AUTH_PASSWORD_RESET: 'auth.password_reset',
  PROFILE_UPDATE: 'profile.update',
  INQUIRY_CREATE: 'inquiry.create',
  INQUIRY_VIEW: 'inquiry.view',
  INQUIRY_UPDATE: 'inquiry.update',
  ADMIN_ACCESS: 'admin.access',
  ROLE_ASSIGN: 'role.assign',
  ROLE_REVOKE: 'role.revoke'
} as const;

// Get client IP (best effort)
export const getClientIP = async (): Promise<string | undefined> => {
  try {
    // This is a simple approach - in production you'd want a more robust solution
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return undefined;
  }
};

// Get user agent
export const getUserAgent = (): string => {
  return navigator.userAgent;
};

// Rate limiting helper (client-side basic implementation)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const isRateLimited = (key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxAttempts) {
    return true;
  }

  record.count++;
  return false;
};

// Clear rate limit for a key (e.g., on successful auth)
export const clearRateLimit = (key: string): void => {
  rateLimitStore.delete(key);
};