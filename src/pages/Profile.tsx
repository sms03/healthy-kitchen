
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Camera, User, ShoppingBag, CreditCard, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  full_name: string;
  username: string;
  profile_image_url: string;
  subscription_tier: string;
  subscription_start_date: string;
  subscription_end_date: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { user, updateProfile, signOut, loading: authLoading, signingOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect to auth page if user is not authenticated
  useEffect(() => {
    if (!authLoading && !user && !signingOut) {
      navigate('/auth');
    }
  }, [user, authLoading, signingOut, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive"
      });
    } else {
      setProfile(data);
      setFullName(data.full_name || "");
      setUsername(data.username || "");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateProfile({
      full_name: fullName,
      username: username
    });

    if (!error) {
      fetchProfile();
    }

    setLoading(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      const { error: updateError } = await updateProfile({
        profile_image_url: publicUrl
      });

      if (updateError) {
        throw updateError;
      }

      fetchProfile();
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getSubscriptionBadgeColor = (tier: string) => {
    switch (tier) {
      case 'pro': return 'bg-blue-500';
      case 'pro_plus': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-6">
            {/* Profile Header */}
            <Card className="bg-white/80 backdrop-blur-md shadow-xl border border-white/20">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profile?.profile_image_url} />
                      <AvatarFallback className="text-xl">
                        {profile?.full_name ? getInitials(profile.full_name) : <User />}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      {profile?.full_name || "Loading..."}
                    </h1>
                    <p className="text-gray-600">@{profile?.username}</p>
                    {profile?.subscription_tier && (
                      <Badge className={`mt-2 ${getSubscriptionBadgeColor(profile.subscription_tier)} text-white`}>
                        {profile.subscription_tier.replace('_', ' ').toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Profile Management */}
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="subscription" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Subscription
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="bg-white/80 backdrop-blur-md shadow-xl border border-white/20">
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input
                          id="fullname"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter your username"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={user.email || ""}
                          disabled
                          className="bg-gray-100"
                        />
                        <p className="text-sm text-gray-500">
                          Email changes are not currently supported
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <Button 
                          type="submit" 
                          disabled={loading}
                          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                        >
                          {loading ? "Updating..." : "Update Profile"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={signOut}
                          disabled={signingOut}
                        >
                          {signingOut ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Signing Out...
                            </>
                          ) : (
                            "Sign Out"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="bg-white/80 backdrop-blur-md shadow-xl border border-white/20">
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">No orders yet. Start shopping to see your order history!</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="subscription">
                <Card className="bg-white/80 backdrop-blur-md shadow-xl border border-white/20">
                  <CardHeader>
                    <CardTitle>Subscription Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Current Plan</Label>
                        <p className="text-lg font-semibold">
                          {profile?.subscription_tier?.replace('_', ' ').toUpperCase() || 'FREE'}
                        </p>
                      </div>
                      {profile?.subscription_start_date && (
                        <div>
                          <Label>Subscription Started</Label>
                          <p>{new Date(profile.subscription_start_date).toLocaleDateString()}</p>
                        </div>
                      )}
                      {profile?.subscription_end_date && (
                        <div>
                          <Label>Subscription Ends</Label>
                          <p>{new Date(profile.subscription_end_date).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
