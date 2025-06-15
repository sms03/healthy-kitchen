
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items: cartItems, removeFromCart, updateQuantity, getCartItemsCount, getCartTotal } = useCart();
  
  const total = getCartTotal();
  const itemCount = getCartItemsCount();

  // Filter out any items with invalid IDs for rendering
  const validCartItems = cartItems.filter(item => 
    typeof item.id === 'number' && 
    !isNaN(item.id) && 
    item.id > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation cartItemsCount={itemCount} onCartClick={() => {}} />
      
      <main className="pt-32 pb-16">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center mb-8">
              <Link to="/menu" className="mr-4">
                <Button variant="outline" size="sm" className="rounded-full transition-all duration-300 hover:scale-105">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Menu
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-gray-800">
                Your <span className="text-gradient bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Cart</span>
              </h1>
            </div>

            {validCartItems.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-xl">
                <CardContent className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-3">Your cart is empty</h2>
                  <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
                  <Link to="/menu">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white transition-all duration-300 hover:scale-105">
                      Browse Menu
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {validCartItems.map((item) => (
                    <Card key={`cart-item-${item.id}`} className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-lg transition-all duration-300 hover:shadow-xl">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          {/* Item Image */}
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center text-3xl transition-transform duration-300 hover:scale-110">
                            {item.image}
                          </div>

                          {/* Item Details */}
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-orange-600 font-semibold text-lg">₹{item.price}</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 p-0 rounded-full transition-all duration-300 hover:scale-110"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            
                            <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 p-0 rounded-full transition-all duration-300 hover:scale-110"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2 transition-all duration-300 hover:scale-110"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-xl sticky top-32">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Items ({itemCount})</span>
                          <span className="font-semibold">₹{total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery Fee</span>
                          <span className="font-semibold">₹50</span>
                        </div>
                        <hr className="border-orange-100" />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-orange-600">₹{total + 50}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 text-lg transition-all duration-300 hover:scale-105">
                        Proceed to Checkout
                      </Button>
                      
                      <p className="text-xs text-gray-500 text-center mt-4">
                        Estimated delivery time: 30-45 minutes
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
