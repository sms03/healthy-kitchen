import { useState, useEffect } from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { logSecurityEvent, SecurityEvents, getClientIP, getUserAgent } from '@/lib/security';
import { format } from 'date-fns';

interface ContactInquiry {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string | null;
  dish_name: string;
  serving_size: string | null;
  quantity: number;
  special_requests: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export const AdminPanel = () => {
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (roleLoading) return;
    
    if (!isAdmin()) {
      setLoading(false);
      return;
    }

    fetchInquiries();
  }, [isAdmin, roleLoading]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);

      // Log admin access to sensitive data
      await logSecurityEvent({
        action: SecurityEvents.ADMIN_ACCESS,
        resource: 'contact_inquiries',
        ipAddress: await getClientIP(),
        userAgent: getUserAgent()
      });

      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching inquiries:', error);
        setError('Failed to load inquiries');
        return;
      }

      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating inquiry status:', error);
        return;
      }

      // Log the status update
      await logSecurityEvent({
        action: SecurityEvents.INQUIRY_UPDATE,
        resource: 'contact_inquiries',
        resourceId: id,
        ipAddress: await getClientIP(),
        userAgent: getUserAgent()
      });

      // Update local state
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === id 
            ? { ...inquiry, status: newStatus, updated_at: new Date().toISOString() }
            : inquiry
        )
      );
    } catch (err) {
      console.error('Error updating inquiry status:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (roleLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            You don't have permission to access this panel.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-red-600">{error}</p>
          <Button onClick={fetchInquiries} className="mt-4 mx-auto block">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          Administrator
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Inquiries ({inquiries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No customer inquiries found.
            </p>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <Card key={inquiry.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-lg">{inquiry.dish_name}</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p><strong>Customer:</strong> {inquiry.user_name}</p>
                          <p><strong>Email:</strong> {inquiry.user_email}</p>
                          {inquiry.user_phone && (
                            <p><strong>Phone:</strong> {inquiry.user_phone}</p>
                          )}
                          <p><strong>Quantity:</strong> {inquiry.quantity}</p>
                          {inquiry.serving_size && (
                            <p><strong>Serving:</strong> {inquiry.serving_size}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(inquiry.status)}>
                            {inquiry.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(inquiry.created_at), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        
                        {inquiry.special_requests && (
                          <div>
                            <p className="text-sm font-medium">Special Requests:</p>
                            <p className="text-sm text-muted-foreground">
                              {inquiry.special_requests}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex gap-2 pt-2">
                          {inquiry.status !== 'completed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateInquiryStatus(inquiry.id, 'completed')}
                            >
                              Mark Complete
                            </Button>
                          )}
                          {inquiry.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateInquiryStatus(inquiry.id, 'in_progress')}
                            >
                              In Progress
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};