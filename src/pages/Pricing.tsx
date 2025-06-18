import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Crown, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Free",
      icon: Star,
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started with basic recipes",
      features: [
        "Access to 5 basic recipes",
        "Basic cooking instructions",
        "Email support",
        "Recipe rating system",
        "Basic meal planning"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      icon: Crown,
      price: { monthly: 299, yearly: 2990 },
      description: "Unlock premium recipes and exclusive discounts",
      features: [
        "Access to 50+ premium recipes",
        "Video cooking tutorials",
        "15% discount on all orders",
        "Priority customer support",
        "Advanced meal planning",
        "Nutritional information",
        "Recipe customization tools"
      ],
      buttonText: "Start Pro",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Pro Plus",
      icon: Sparkles,
      price: { monthly: 499, yearly: 4990 },
      description: "The ultimate cooking experience with exclusive perks",
      features: [
        "Access to 100+ exclusive recipes",
        "Live cooking sessions with Chef Sharvari",
        "25% discount on all orders",
        "Free side dish with every order",
        "Personal recipe consultation",
        "Early access to new recipes",
        "VIP customer support",
        "Custom meal plans",
        "Recipe creation tools"
      ],
      buttonText: "Go Pro Plus",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Choose Your <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Culinary</span> Journey
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Unlock the secrets of authentic cooking with Chef Sharvari's exclusive recipes, 
                tutorials, and personalized guidance.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex bg-white rounded-full p-1 shadow-lg border border-orange-100">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    billingPeriod === 'monthly'
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    billingPeriod === 'yearly'
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Yearly
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Save 17%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => {
                const IconComponent = plan.icon;
                const price = plan.price[billingPeriod];
                const yearlyDiscount = billingPeriod === 'yearly' && plan.price.monthly > 0;
                
                return (
                  <Card 
                    key={plan.name}
                    className={`relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm ${
                      plan.popular 
                        ? 'border-orange-500 border-2 shadow-xl scale-105' 
                        : 'border-orange-100 hover:border-orange-300'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-orange-500 to-red-600' 
                          : 'bg-gradient-to-r from-orange-100 to-red-100'
                      }`}>
                        <IconComponent className={`w-8 h-8 ${
                          plan.popular ? 'text-white' : 'text-orange-600'
                        }`} />
                      </div>
                      
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        {plan.name}
                      </CardTitle>
                      
                      <div className="mt-4">
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-bold text-gray-900">
                            ₹{price}
                          </span>
                          {price > 0 && (
                            <span className="text-gray-500 ml-2">
                              /{billingPeriod === 'monthly' ? 'month' : 'year'}
                            </span>
                          )}
                        </div>
                        {yearlyDiscount && (
                          <div className="text-sm text-green-600 mt-1">
                            <span className="line-through text-gray-400">
                              ₹{plan.price.monthly * 12}
                            </span>
                            <span className="ml-2 font-semibold">Save ₹{(plan.price.monthly * 12) - plan.price.yearly}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mt-4">
                        {plan.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-gray-700 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        variant={plan.buttonVariant}
                        className={`w-full py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                          plan.buttonVariant === 'default'
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg'
                            : 'border-orange-300 text-orange-600 hover:bg-orange-50'
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* FAQ Section */}
            <div className="mt-20 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Can I change my plan anytime?
                    </h3>
                    <p className="text-gray-600">
                      Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Do you offer refunds?
                    </h3>
                    <p className="text-gray-600">
                      We offer a 7-day money-back guarantee for all paid plans if you're not completely satisfied.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Are recipes suitable for beginners?
                    </h3>
                    <p className="text-gray-600">
                      Absolutely! Our recipes come with detailed instructions and video tutorials suitable for all skill levels.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      How do discounts work?
                    </h3>
                    <p className="text-gray-600">
                      Discounts are automatically applied to your orders and can be combined with seasonal promotions.
                    </p>
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

export default Pricing;
