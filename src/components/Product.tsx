// Product.tsx

'use client';

import Image from 'next/image';
import { useCart } from './CartContext';

interface ProductProps {
  product: Product;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { addToCart, cart } = useCart();
  const isProductInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="border rounded-lg p-6 shadow-md max-w-sm">
      <div className="flex items-center space-x-4">
        {/* Ensure the image exists or use a fallback */}
        <Image
          src={product.image || '/placeholder-image.jpg'} // Fallback image if undefined
          alt={product.name}
          width={64}
          height={64}
          className="object-cover rounded"
        />
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-400">${product.price.toFixed(2)}</p>

          <button
            onClick={() => addToCart(product)}
            disabled={isProductInCart}
            className={`mt-4 px-4 py-2 ${
              isProductInCart
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {isProductInCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
