import React from "react";

export const PersonalRecipes = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Personal Recipes</h2>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-16 max-w-2xl mx-auto">
          <div className="text-8xl mb-6">👨‍🍳</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Coming Soon!</h3>
          <p className="text-gray-600 text-lg">
            We're working on a feature that will allow you to create and manage your own personal recipes.
            Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
};