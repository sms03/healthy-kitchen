import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Loader2, User, Mail, Phone, Edit, Save, X, Heart, ChefHat, Calendar, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    phone: "",
  });

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
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          username: data.username || "",
          phone: data.phone || "",
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
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

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...formData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setProfile({ ...profile, ...formData });
      setEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || "",
      username: profile?.username || "",
      phone: profile?.phone || "",
    });
    setEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navigation />
        <div className="container mx-auto px-4 pt-32">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navigation />
        <div className="container mx-auto px-4 pt-32">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Please sign in to view your profile</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Header */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-orange-100 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarImage src={profile?.profile_image_url} />
                  <AvatarFallback className="bg-white text-orange-600 text-2xl font-bold">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">
                    {profile?.full_name || 'Welcome'}
                  </h1>
                  <p className="text-orange-100 text-lg">
                    @{profile?.username || 'user'}
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm text-orange-100">
                        Member since {new Date(profile?.created_at || '').toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!editing ? (
                    <Button
                      onClick={() => setEditing(true)}
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleSave}
                        disabled={saving}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full">
              <TabsTrigger value="profile" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-full">
                <User className="w-4 h-4 mr-2" />
                Profile Details
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-full">
                <ChefHat className="w-4 h-4 mr-2" />
                My Inquiries
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800 flex items-center">
                    <User className="w-6 h-6 mr-2 text-orange-600" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-gray-700 font-medium">Full Name</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        disabled={!editing}
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        disabled={!editing}
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                      <Input
                        id="email"
                        value={user?.email || ""}
                        disabled
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!editing}
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-orange-100">
                    <Button
                      onClick={signOut}
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800 flex items-center">
                    <MessageCircle className="w-6 h-6 mr-2 text-orange-600" />
                    My Pre-Order Inquiries
                  </CardTitle>
                  <CardDescription>
                    Track your dish inquiries and pre-orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {inquiries.length === 0 ? (
                    <div className="text-center py-12">
                      <ChefHat className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No inquiries yet</h3>
                      <p className="text-gray-500">Start exploring our menu and place your first inquiry!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="border border-orange-100 rounded-lg p-4 bg-gradient-to-r from-orange-25 to-red-25">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-800">{inquiry.dish_name}</h3>
                              <p className="text-gray-600">Quantity: {inquiry.quantity} | Serving: {inquiry.serving_size || 'Standard'}</p>
                            </div>
                            <Badge className={getStatusColor(inquiry.status)}>
                              {inquiry.status}
                            </Badge>
                          </div>
                          {inquiry.special_requests && (
                            <div className="mb-3">
                              <p className="text-sm text-gray-600">
                                <strong>Special Requests:</strong> {inquiry.special_requests}
                              </p>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Submitted on {new Date(inquiry.created_at).toLocaleDateString()}</span>
                            <span>Type: {inquiry.inquiry_type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
