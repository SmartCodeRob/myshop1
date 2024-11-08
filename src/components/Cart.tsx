// components/Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);

  return (
    // Modal backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start p-4">
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Modal header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button 
            onClick={() => dispatch(toggleCart())}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <>
              {/* Cart items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() => {
                          if (item.cartQuantity > 1) {
                            dispatch(updateQuantity({ id: item.id, quantity: item.cartQuantity - 1 }));
                          }
                        }}
                      >
                        -
                      </button>
                      
                      <span className="w-8 text-center">{item.cartQuantity}</span>
                      
                      <button
                        className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.cartQuantity + 1 }))}
                      >
                        +
                      </button>

                      <button
                        className="ml-2 px-2 py-1 text-red-500 hover:text-red-700"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart footer */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex gap-4">
                  <button
                    className="flex-1 px-4 py-2 border rounded hover:bg-gray-100"
                    onClick={() => dispatch(toggleCart())}
                  >
                    Continue Shopping
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      dispatch(clearCart());
                      dispatch(toggleCart());
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;