import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AvailabilityInfo } from "@/hooks/useAvailability";

interface ContactInquiryProps {
  isOpen: boolean;
  onClose: () => void;
  dishName: string;
  dishId: number;
  servingSize?: string;
  availabilityInfo: AvailabilityInfo;
  finalPrice: number;
}

export const ContactInquiry = ({ isOpen, onClose, dishName, dishId, servingSize, availabilityInfo, finalPrice }: ContactInquiryProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    specialRequests: ""
  });

  const handleWhatsAppOrder = () => {
    const orderType = availabilityInfo.status === 'available' ? 'Order' :
                     availabilityInfo.status === 'preorder' ? 'Preorder for Sunday' :
                     availabilityInfo.status === 'special_order' ? 'Special Order Request' :
                     'Inquiry';

    const message = `Hi! I'd like to place a ${orderType}:

🍽️ Dish: ${dishName}
📏 Serving: ${servingSize || 'Regular'}
🔢 Quantity: ${formData.quantity}
💰 Total Price: ₹${finalPrice * formData.quantity}
📊 Status: ${availabilityInfo.message}

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}
${formData.specialRequests ? `\n📝 Special Requests: ${formData.specialRequests}` : ''}

Please confirm availability and payment details. Thank you!`;

    const whatsappUrl = `https://wa.me/919822042638?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert({
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          dish_name: dishName,
          dish_id: dishId,
          serving_size: servingSize || 'Regular',
          quantity: formData.quantity,
          special_requests: formData.specialRequests,
          inquiry_type: availabilityInfo.status === 'preorder' ? 'preorder' : 
                       availabilityInfo.status === 'special_order' ? 'special_order' : 'order',
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Inquiry Sent Successfully!",
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {availabilityInfo.status === 'available' ? 'Order Now' :
             availabilityInfo.status === 'preorder' ? 'Preorder for Sunday' :
             availabilityInfo.status === 'special_order' ? 'Special Order Request' :
             'Contact for Pre-Order'}
          </DialogTitle>
          <div className="space-y-2">
            <p className="text-gray-600">
              {availabilityInfo.status === 'available' ? 'Place your order for' :
               availabilityInfo.status === 'preorder' ? 'Preorder for Sunday delivery:' :
               availabilityInfo.status === 'special_order' ? 'Request special order for' :
               'Get in touch with us to place your pre-order for'} <span className="font-semibold text-orange-600">{dishName}</span>
              {servingSize && ` (${servingSize})`}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-orange-50 text-orange-700">
                ₹{finalPrice}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {availabilityInfo.message}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                required
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 1234567890"
                required
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              required
              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <Label>Total Price</Label>
                <Input
                  value={`₹${finalPrice * formData.quantity}`}
                  disabled
                  className="bg-gray-50 font-semibold text-orange-600"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specialRequests">
                {availabilityInfo.status === 'preorder' ? 'Special Requests for Sunday Delivery (Optional)' :
                 availabilityInfo.status === 'special_order' ? 'Special Order Details & Requirements' :
                 'Special Requests (Optional)'}
              </Label>
              <Textarea
                id="specialRequests"
                placeholder={
                  availabilityInfo.status === 'preorder' ? 'Any special requests for your Sunday preorder?' :
                  availabilityInfo.status === 'special_order' ? 'Please specify your special order requirements and preferred delivery date...' :
                  'Any special requests or dietary requirements?'
                }
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                rows={3}
              />
            </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleWhatsAppOrder}
              disabled={!formData.name || !formData.phone || !formData.email}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 rounded-full transition-all duration-300"
            >
              {availabilityInfo.status === 'available' ? 'Send Order via WhatsApp' :
               availabilityInfo.status === 'preorder' ? 'Send Preorder via WhatsApp' :
               availabilityInfo.status === 'special_order' ? 'Request Special Order' :
               'Send WhatsApp Message'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};