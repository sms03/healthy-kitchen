
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageCircle, Phone } from "lucide-react";

interface ContactInquiryProps {
  isOpen: boolean;
  onClose: () => void;
  dish: {
    name: string;
    price: number;
    originalId?: string;
  };
  servingSize?: string;
}

export const ContactInquiry = ({ isOpen, onClose, dish, servingSize }: ContactInquiryProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "1",
    specialRequests: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert({
          user_id: user?.id || null,
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          dish_name: dish.name,
          dish_id: dish.originalId || null,
          serving_size: servingSize || null,
          quantity: parseInt(formData.quantity),
          special_requests: formData.specialRequests || null,
          inquiry_type: 'pre_order',
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: "Inquiry Submitted!",
        description: "We'll contact you soon to confirm your order. You can also reach us directly at +91 9822042638",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        quantity: "1",
        specialRequests: "",
      });

      onClose();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <MessageCircle className="w-5 h-5 mr-2 text-orange-600" />
            Contact for Pre-Order: {dish.name}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll contact you to confirm your order.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="border-orange-200 focus:border-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="border-orange-200 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="border-orange-200 focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Select value={formData.quantity} onValueChange={(value) => setFormData({ ...formData, quantity: value })}>
                <SelectTrigger className="border-orange-200 focus:border-orange-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {servingSize && (
              <div className="space-y-2">
                <Label>Serving Size</Label>
                <Input value={servingSize} disabled className="bg-gray-50" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requests">Special Requests (Optional)</Label>
            <Textarea
              id="requests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="Any special cooking instructions, dietary requirements, or preferences..."
              className="border-orange-200 focus:border-orange-500"
            />
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-medium text-orange-800 mb-2">Order Summary</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Dish:</span>
                <span className="font-medium">{dish.name}</span>
              </div>
              {servingSize && (
                <div className="flex justify-between">
                  <span>Serving:</span>
                  <span className="font-medium">{servingSize}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span className="font-medium">{formData.quantity}</span>
              </div>
              <div className="flex justify-between font-semibold text-orange-800 pt-2 border-t border-orange-200">
                <span>Estimated Price:</span>
                <span>₹{dish.price * parseInt(formData.quantity)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <Phone className="w-4 h-4 mr-2 text-blue-600" />
              <span className="font-medium text-blue-800">Direct Contact</span>
            </div>
            <p className="text-sm text-blue-700">
              You can also call us directly at{" "}
              <a href="tel:+919822042638" className="font-medium underline">
                +91 9822042638
              </a>{" "}
              for immediate assistance.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
