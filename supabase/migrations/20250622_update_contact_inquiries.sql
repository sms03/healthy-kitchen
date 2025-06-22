-- Update contact_inquiries table to include new fields for special requests pricing
ALTER TABLE public.contact_inquiries 
ADD COLUMN IF NOT EXISTS estimated_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS has_special_requests BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS whatsapp_number TEXT DEFAULT '+919822042638';

-- Update existing records to set has_special_requests based on special_requests content
UPDATE public.contact_inquiries 
SET has_special_requests = (special_requests IS NOT NULL AND TRIM(special_requests) != '');

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_user_id ON public.contact_inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON public.contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON public.contact_inquiries(created_at);
