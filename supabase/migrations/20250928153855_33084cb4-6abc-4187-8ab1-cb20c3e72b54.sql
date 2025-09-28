-- Create admin role management system and security enhancements

-- 1. Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4. Create audit log table for security monitoring
CREATE TABLE public.security_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    resource_id TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- 5. RLS policies for user_roles table
CREATE POLICY "Users can view own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- 6. Enhanced RLS policies for contact_inquiries (allow admin access)
DROP POLICY IF EXISTS "Users can view own inquiries" ON public.contact_inquiries;

CREATE POLICY "Users can view own inquiries" 
ON public.contact_inquiries 
FOR SELECT 
USING (
    auth.uid() = user_id 
    OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update inquiry status" 
ON public.contact_inquiries 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- 7. RLS policies for security audit log
CREATE POLICY "Admins can view audit logs" 
ON public.security_audit_log 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert audit logs" 
ON public.security_audit_log 
FOR INSERT 
WITH CHECK (true);

-- 8. Function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
    _action TEXT,
    _resource TEXT,
    _resource_id TEXT DEFAULT NULL,
    _ip_address INET DEFAULT NULL,
    _user_agent TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.security_audit_log (
        user_id, action, resource, resource_id, ip_address, user_agent
    ) VALUES (
        auth.uid(), _action, _resource, _resource_id, _ip_address, _user_agent
    );
END;
$$;

-- 9. Create trigger to automatically assign default user role
CREATE OR REPLACE FUNCTION public.assign_default_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role, created_by)
    VALUES (NEW.id, 'user', NEW.id);
    RETURN NEW;
END;
$$;

-- Update the existing trigger to also assign default role
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Create profile
    INSERT INTO public.profiles (id, full_name, username)
    VALUES (
        NEW.id, 
        NEW.raw_user_meta_data ->> 'full_name',
        NEW.raw_user_meta_data ->> 'username'
    );
    
    -- Assign default user role
    INSERT INTO public.user_roles (user_id, role, created_by)
    VALUES (NEW.id, 'user', NEW.id);
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();