// src/components/ProductList.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types';
import { setCurrentPage } from '../store/slices/productSlice';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const { products, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.products
  );

  // Oblicz produkty do wyświetlenia na podstawie paginacji
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Oblicz całkowitą liczbę stron
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="space-y-8">
      {/* Grid z produktami */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginacja */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => dispatch(setCurrentPage(page))}
              className={`
                px-4 py-2 rounded-lg transition-colors
                ${currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;