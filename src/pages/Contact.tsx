
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageCircle, Clock, CreditCard } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
      <Navigation />
        <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
          <div className="relative container mx-auto px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20 mb-6">
                <MessageCircle className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-slate-700">Contact Us</span>
              </div>              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
                Get in 
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Have questions about our menu or want to place a pre-order? We'd love to hear from you and help bring our delicious dishes to your table.
              </p>
            </div>            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Contact Form */}
              <div className="space-y-6">
                <div className="modern-card p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                        <Input 
                          placeholder="Enter your full name" 
                          className="border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 h-9"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                        <Input 
                          placeholder="Enter your phone number" 
                          className="border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 h-9"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <Input 
                        placeholder="Enter your email address" 
                        type="email"
                        className="border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 h-9"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                      <Textarea 
                        placeholder="Tell us about your requirements, pre-order details, or any questions you have..."
                        rows={4}
                        className="border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                      />
                    </div>
                    
                    <Button className="w-full cta-button h-10 text-sm font-medium">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {/* Contact Cards */}
                <div className="grid gap-4">
                  <div className="modern-card p-4 group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Phone</h3>
                        <p className="text-slate-600 text-sm">+91 98765 43210</p>
                        <p className="text-xs text-slate-500">Available 9 AM - 9 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="modern-card p-4 group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Email</h3>
                        <p className="text-slate-600 text-sm">sharvari@healthykitchen.com</p>
                        <p className="text-xs text-slate-500">Response within 24 hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="modern-card p-4 group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-red-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Service Area</h3>
                        <p className="text-slate-600 text-sm">Mumbai & Surrounding Areas</p>
                        <p className="text-xs text-slate-500">Free delivery within 10km</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pre-order Information */}
                <div className="modern-card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Pre-Order Process</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-indigo-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Limited Daily Orders</p>
                        <p className="text-xs text-slate-600">First come, first served basis</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-indigo-600">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">50% Advance Payment</p>
                        <p className="text-xs text-slate-600">Required to confirm your order</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-indigo-600">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Balance on Delivery</p>
                        <p className="text-xs text-slate-600">Pay remaining 50% when you receive your order</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-3 h-3 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Quick Confirmation</p>
                        <p className="text-xs text-slate-600">We'll contact you within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
