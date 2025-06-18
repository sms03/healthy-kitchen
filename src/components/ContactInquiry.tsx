
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Phone, Mail, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ContactInquiryProps {
  isOpen: boolean;
  onClose: () => void;
  dish?: {
    id: number;
    originalId?: string;
    name: string;
    price: number;
  };
  servingSize?: string;
}

export const ContactInquiry = ({ isOpen, onClose, dish, servingSize }: ContactInquiryProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    specialRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to place a pre-order inquiry",
        variant: "destructive"
      });
      return;
    }

    if (!dish) {
      toast({
        title: "Error",
        description: "No dish selected",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert({
          user_id: user.id,
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          dish_name: dish.name,
          dish_id: dish.originalId,
          serving_size: servingSize || 'Regular',
          quantity: formData.quantity,
          special_requests: formData.specialRequests,
          inquiry_type: 'pre_order'
        });

      if (error) throw error;

      toast({
        title: "Pre-Order Inquiry Sent!",
        description: "We'll contact you within 24 hours to confirm your order and payment details.",
      });

      onClose();
      setFormData({ name: "", email: "", phone: "", quantity: 1, specialRequests: "" });
    } catch (error: any) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to submit your inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[90vh] bg-white shadow-2xl flex flex-col overflow-hidden">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Pre-Order Inquiry
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {dish && (
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="font-medium text-orange-800">{dish.name}</p>
              {servingSize && (
                <p className="text-sm text-orange-600">Serving: {servingSize}</p>
              )}
              <p className="text-sm text-orange-600">Price: ₹{dish.price}</p>
            </div>
          )}        </CardHeader>

        <CardContent className="space-y-4 flex-1 overflow-y-auto scrollbar-custom px-6 pb-6">          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
            <p className="font-medium mb-1">📋 Pre-Order Process:</p>
            <div className="space-y-1">
              <p>• Pay 50% advance to confirm order</p>
              <p>• Remaining 50% on delivery</p>
              <p>• We'll contact you within 24 hours</p>
            </div>
          </div>          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="quantity" className="text-sm font-medium">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="requests" className="text-sm font-medium">Special Requests (Optional)</Label>
                <Textarea
                  id="requests"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="mt-1 scrollbar-thin"
                  rows={2}
                  placeholder="Any special dietary requirements or preferences..."
                />
              </div>
            </div>            <div className="flex gap-2 pt-3 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                {isSubmitting ? "Submitting..." : "Send Inquiry"}
              </Button>
            </div>
          </form>

          <div className="flex items-center justify-center pt-2 border-t">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-1" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
