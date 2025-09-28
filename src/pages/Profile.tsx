import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useUserRole } from '@/hooks/useUserRole';
import { AdminPanel } from '@/components/AdminPanel';
import { profileUpdateSchema, ProfileUpdateInput } from '@/lib/validation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Phone, Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { isAdmin, roles } = useUserRole();
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    phone: ''
  });
  const [originalProfile, setOriginalProfile] = useState({
    full_name: '',
    username: '',
    phone: ''
  });
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchInquiries();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const profileData = {
          full_name: data.full_name || '',
          username: data.username || '',
          phone: data.phone || ''
        };
        setProfile(profileData);
        setOriginalProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setValidationErrors({});

      // Validate the profile data
      const validationResult = profileUpdateSchema.safeParse({
        full_name: profile.full_name || undefined,
        username: profile.username || undefined,
        phone: profile.phone || undefined
      });

      if (!validationResult.success) {
        const errors: Record<string, string> = {};
        validationResult.error.errors.forEach((error) => {
          if (error.path.length > 0) {
            errors[error.path[0]] = error.message;
          }
        });
        setValidationErrors(errors);
        return;
      }

      const { error } = await updateProfile(validationResult.data);
      
      if (!error) {
        setOriginalProfile({ ...profile });
        setEditing(false);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile({ ...originalProfile });
    setValidationErrors({});
    setEditing(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navigation />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navigation />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-lg">Please sign in to view your profile.</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {profile.full_name || user.email}
                  </h1>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex gap-2 mt-2">
                    {roles.map(role => (
                      <Badge key={role} variant={role === 'admin' ? 'default' : 'secondary'}>
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {!editing ? (
                <Button
                  onClick={() => setEditing(true)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className={`grid w-full ${isAdmin() ? 'grid-cols-3' : 'grid-cols-2'}`}>
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="inquiries">My Inquiries</TabsTrigger>
              {isAdmin() && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        type="text"
                        value={profile.full_name}
                        onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                        disabled={!editing}
                        className={validationErrors.full_name ? 'border-red-500' : ''}
                      />
                      {validationErrors.full_name && (
                        <p className="text-sm text-red-500">{validationErrors.full_name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                        disabled={!editing}
                        className={validationErrors.username ? 'border-red-500' : ''}
                      />
                      {validationErrors.username && (
                        <p className="text-sm text-red-500">{validationErrors.username}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!editing}
                        className={validationErrors.phone ? 'border-red-500' : ''}
                        placeholder="+1 (555) 123-4567"
                      />
                      {validationErrors.phone && (
                        <p className="text-sm text-red-500">{validationErrors.phone}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inquiries">
              <Card>
                <CardHeader>
                  <CardTitle>My Inquiries ({inquiries.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {inquiries.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven't made any inquiries yet.</p>
                      <Button variant="outline" onClick={() => window.location.href = '/menu'}>
                        Browse Menu
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inquiry) => (
                        <Card key={inquiry.id} className="border-l-4 border-l-primary">
                          <CardContent className="pt-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">{inquiry.dish_name}</h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p><span className="font-medium">Quantity:</span> {inquiry.quantity}</p>
                                  {inquiry.serving_size && (
                                    <p><span className="font-medium">Serving:</span> {inquiry.serving_size}</p>
                                  )}
                                  {inquiry.special_requests && (
                                    <p><span className="font-medium">Special Requests:</span> {inquiry.special_requests}</p>
                                  )}
                                  <p><span className="font-medium">Submitted:</span> {format(new Date(inquiry.created_at), 'MMM dd, yyyy \'at\' h:mm a')}</p>
                                </div>
                              </div>
                              <Badge className={getStatusColor(inquiry.status)}>
                                {inquiry.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {isAdmin() && (
              <TabsContent value="admin">
                <AdminPanel />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;