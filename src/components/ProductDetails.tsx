// components/ProductDetails.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState<number>(1);
  
  const product = useSelector((state: RootState) => 
    state.products.products.find(p => p.id === Number(id))
  );

  if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Product not found</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.quantity) {
      dispatch(addToCart({ product, quantity }));
      // Możesz dodać tutaj jakieś powiadomienie o sukcesie
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Back button */}
      <div className="p-4 border-b">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          {/* Back Arrow Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to products
        </button>
      </div>

      {/* Product content */}
      <div className="grid md:grid-cols-2 gap-8 p-6">
        {/* Product image */}
        <div className="aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product info */}
        <div className="space-y-6">
          {/* Title and price */}
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-3xl font-bold mt-2 text-blue-600">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          {/* Availability */}
          <div>
            <h2 className="font-semibold text-gray-900">Availability</h2>
            <p className={`mt-2 ${
              product.quantity < 10 ? 'text-orange-500' : 'text-green-500'
            }`}>
              {product.quantity} items left
            </p>
          </div>

          {/* Add to cart form */}
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="quantity" 
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <div className="flex gap-4 mt-2">
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleAddToCart}
                  disabled={quantity < 1 || quantity > product.quantity}
                  className={`
                    flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2
                    ${quantity < 1 || quantity > product.quantity
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                    }
                  `}
                >
                  {/* Cart Icon */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
              {quantity > product.quantity && (
                <p className="mt-2 text-sm text-red-500">
                  Cannot exceed available quantity
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;