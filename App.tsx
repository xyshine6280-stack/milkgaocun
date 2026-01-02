
import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem } from './types';
import ProductCard from './components/ProductCard';
import ImageEditor from './components/ImageEditor';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const addToCart = (product: Product) => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast(`已添加 ${product.name} 到购物车`);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSaveImage = (newUrl: string) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, imageUrl: newUrl } : p))
      );
      setEditingProduct(null);
      setToast('图片定制成功！');
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-24 md:pb-0 safe-top">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-slate-800/90 backdrop-blur text-white px-6 py-3 rounded-full text-sm font-medium shadow-2xl animate-slide-up">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-slate-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
              BabyMilk Pro
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsHelpOpen(true)}
              className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
              title="帮助指南"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-slate-100 rounded-full hover:bg-slate-200 active:scale-90 transition-all"
            >
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-xl">安装与使用指南</h3>
              <button onClick={() => setIsHelpOpen(false)} className="p-2 bg-slate-100 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              <div>
                <h4 className="font-bold text-sky-600 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs">1</span>
                  如何获得网址？
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  下载的压缩包是代码。您可以使用 <strong>Vercel</strong> 或 <strong>Netlify</strong> 将其上线。上线后，浏览器顶部的地址就是您的小程序网址。
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sky-600 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs">2</span>
                  如何安装到手机？
                </h4>
                <div className="bg-slate-50 p-3 rounded-xl space-y-2 text-sm text-slate-600">
                  <p><strong>iOS (iPhone):</strong> 在 Safari 打开网址 → 点击底部“分享” → 选择“添加到主屏幕”。</p>
                  <p><strong>Android:</strong> 在 Chrome 打开网址 → 点击右上角“...” → 选择“安装应用”。</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sky-600 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs">3</span>
                  如何修改图片？
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  在商品卡片右上角点击 <strong>AI图标</strong>，即可通过输入文字指令（如“草地背景”）实时修改商品展示图。
                </p>
              </div>
            </div>
            <div className="p-6 bg-slate-50">
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero & Search */}
      <section className="bg-gradient-to-b from-sky-50 to-white px-4 pt-8 pb-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-slate-800 mb-2 leading-tight">宝宝的每一餐，<br/>我们都用心守护</h2>
          <p className="text-slate-500 text-sm mb-6">全网直供 · 顺丰到家 · AI 定制</p>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索奶粉品牌或阶段..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-2xl px-12 py-4 shadow-sm focus:ring-2 focus:ring-sky-500 transition-all text-slate-700 outline-none"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-[64px] z-30 bg-white/90 backdrop-blur flex gap-2 p-4 overflow-x-auto no-scrollbar max-w-6xl mx-auto w-full border-b border-slate-50">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-6 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 ${
              activeCategory === cat.id 
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' 
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product List */}
      <main className="flex-grow max-w-6xl mx-auto w-full p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
              onEditImage={setEditingProduct}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>没有找到相关产品</p>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-sm flex flex-col h-full shadow-2xl animate-slide-up md:animate-slide-left">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg">我的购物车 ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 bg-slate-100 rounded-full">
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-400">购物车空空如也</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <img src={item.imageUrl} className="w-16 h-16 rounded-lg object-cover" alt={item.name} />
                    <div className="flex-grow">
                      <h4 className="font-semibold text-sm line-clamp-1 text-slate-800">{item.name}</h4>
                      <p className="text-sky-600 font-bold text-base">¥{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateCartQuantity(item.id, -1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center active:scale-90 text-slate-400 font-bold">-</button>
                      <span className="w-4 text-center text-sm font-bold text-slate-700">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, 1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center active:scale-90 text-slate-400 font-bold">+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t bg-slate-50 pb-safe">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 font-medium">应付金额</span>
                <span className="text-2xl font-black text-sky-600">¥{cartTotal}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 active:scale-95 transition-all disabled:opacity-50"
              >
                立即结算
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Editor Overlay */}
      {editingProduct && (
        <ImageEditor 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
          onSave={handleSaveImage}
        />
      )}

      {/* Bottom Bar (Floating Container) */}
      <div className="fixed bottom-6 left-4 right-4 md:hidden z-40">
        <div className="bg-white/90 backdrop-blur-2xl border border-white/20 px-8 py-4 rounded-[32px] shadow-2xl flex items-center justify-between">
          <button className="flex flex-col items-center gap-1 group">
            <svg className="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.099l7 5.047v12.854h-14v-12.854l7-5.047zm0-2.099l-10 7.21v14.79h16v-14.79l-6-7.21z"/>
            </svg>
            <span className="text-[10px] font-bold text-sky-500">首页</span>
          </button>
          
          <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 group">
            <div className="relative">
               <svg className="w-6 h-6 text-slate-400 group-active:text-slate-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                 <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
               </svg>
               {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full ring-2 ring-white"></span>}
            </div>
            <span className="text-[10px] font-bold text-slate-400">购物车</span>
          </button>

          <button className="flex flex-col items-center gap-1 group">
            <svg className="w-6 h-6 text-slate-400 group-active:text-slate-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[10px] font-bold text-slate-400">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
