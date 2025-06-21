
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Get in <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about our menu or want to place a pre-order? We'd love to hear from you!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        placeholder="Your Name" 
                        className="border-orange-200 focus:border-orange-500"
                      />
                      <Input 
                        placeholder="Phone Number" 
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    
                    <Input 
                      placeholder="Email Address" 
                      type="email"
                      className="border-orange-200 focus:border-orange-500"
                    />
                    
                    <Textarea 
                      placeholder="Your Message or Pre-Order Details"
                      rows={5}
                      className="border-orange-200 focus:border-orange-500"
                    />
                    
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Phone</h3>
                        <p className="text-gray-600">+91 98765 43210</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Email</h3>
                        <p className="text-gray-600">sharvari@healthykitchen.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Location</h3>
                        <p className="text-gray-600">Local Area Delivery</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pre-order Information */}
                <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-200 shadow-xl">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">📋 Pre-Order Process</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>• Limited orders only - First come, first served</p>
                      <p>• 50% advance payment required to confirm order</p>
                      <p>• Remaining 50% to be paid on delivery</p>
                      <p>• We'll contact you within 24 hours to confirm</p>
                    </div>
                  </CardContent>
                </Card>
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

