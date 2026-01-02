
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onEditImage: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onEditImage }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="relative group aspect-square">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={() => onEditImage(product)}
          className="absolute top-2 right-2 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:bg-sky-50 transition-colors border border-sky-100"
          title="使用AI定制背景"
        >
          <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
            {product.brand}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-slate-800 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-slate-500 mb-2">{product.stage}</p>
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-sky-600">¥{product.price}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-sky-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sky-600 active:scale-95 transition-all shadow-md shadow-sky-100"
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
