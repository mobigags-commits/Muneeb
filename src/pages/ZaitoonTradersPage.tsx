import React, { useState } from 'react';
import { ShoppingBag, Star, CheckCircle, Truck, Phone, Plus, Filter, Tag, ShieldCheck } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { ZTProduct } from '../types';
import { AdBanner } from '../components/AdBanner';

export const ZaitoonTradersPage: React.FC = () => {
  const { ztProducts, addZTProduct, siteSettings, role } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<'Dates & Honey' | 'Ittar & Fragrances' | 'Quran Pens & Rehal' | 'Islamic Books' | 'Modest Wear'>('Dates & Honey');
  const [prodPrice, setProdPrice] = useState(2500);
  const [prodOrigPrice, setProdOrigPrice] = useState(3000);
  const [prodDesc, setProdDesc] = useState('');
  const [prodImg, setProdImg] = useState('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80');

  const categories = ['All', 'Dates & Honey', 'Ittar & Fragrances', 'Quran Pens & Rehal', 'Islamic Books', 'Modest Wear'];

  const filteredProducts =
    selectedCategory === 'All'
      ? ztProducts
      : ztProducts.filter((p) => p.category === selectedCategory);

  const handleOrderWhatsApp = (prod: ZTProduct) => {
    const text = `Assalamu Alaikum ZT Traders! I would like to order "${prod.name}" (Price: PKR ${prod.pricePKR}). Please confirm stock and delivery address in Pakistan/Global.`;
    const cleanPhone = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName) return;

    addZTProduct({
      id: `zt-${Date.now()}`,
      name: prodName,
      category: prodCategory,
      pricePKR: Number(prodPrice),
      originalPricePKR: Number(prodOrigPrice),
      image: prodImg,
      description: prodDesc,
      inStock: true,
      isFeatured: true,
      rating: 5.0,
    });

    setShowAddModal(false);
    setProdName('');
    setProdDesc('');
  };

  return (
    <div className="min-h-screen bg-red-950 text-white py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>ZT Traders • Organic Islamic Merchants & Essentials</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
          Zaitoon Traders (ZT) Marketplace
        </h1>
        <p className="text-sm sm:text-base text-red-200 max-w-3xl mx-auto">
          Authentic Madina Ajwa Dates, pure unheated Sidr Honey, alcohol-free Royal Oud Ittars, handcrafted Quran Rehal stands, and digital read pens under the trusted supervision of Shaheen Al Zaitoon Ecosystem in Rawalpindi.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-amber-200 pt-2">
          <span className="flex items-center gap-1 bg-red-900/80 px-3 py-1.5 rounded-full border border-amber-500/30">
            <Truck className="w-4 h-4 text-amber-400" /> Cash on Delivery Nationwide
          </span>
          <span className="flex items-center gap-1 bg-red-900/80 px-3 py-1.5 rounded-full border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> EasyPaisa Verified: {siteSettings.easyPaisaAccountNumber}
          </span>
          <span className="flex items-center gap-1 bg-red-900/80 px-3 py-1.5 rounded-full border border-amber-500/30">
            <CheckCircle className="w-4 h-4 text-amber-400" /> 100% Guaranteed Pure & Authentic
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <AdBanner placement="In-feed Featured" />

        {/* Filter & Admin Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-red-900 via-amber-950 to-red-900 p-4 rounded-2xl border border-amber-500/40 shadow-xl">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <Filter className="w-4 h-4 text-amber-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-red-950 shadow-md'
                    : 'bg-red-950 text-amber-200 border border-amber-500/20 hover:bg-red-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {(role === 'admin' || role === 'owner') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shrink-0 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add New ZT Product</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-gradient-to-br from-red-900 via-amber-950 to-red-900 border-2 border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-amber-400 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {prod.isFeatured && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-red-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Featured
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-red-950/90 text-amber-200 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {prod.rating}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {prod.category}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors mt-1">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-red-200 mt-1 line-clamp-2">{prod.description}</p>
                </div>

                <div className="pt-3 border-t border-amber-500/20 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-serif font-extrabold text-amber-200">
                      PKR {prod.pricePKR.toLocaleString()}
                    </span>
                    {prod.originalPricePKR && (
                      <span className="text-xs text-red-300/70 line-through">
                        PKR {prod.originalPricePKR.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleOrderWhatsApp(prod)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Order Direct on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal for Admin */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-red-950 border-2 border-amber-500/60 rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-amber-200">Add Product to ZT Marketplace</h3>

            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Product Name:</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Category:</label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value as any)}
                  className="w-full bg-red-900 text-amber-100 p-2 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                >
                  <option value="Dates & Honey">Dates & Honey</option>
                  <option value="Ittar & Fragrances">Ittar & Fragrances</option>
                  <option value="Quran Pens & Rehal">Quran Pens & Rehal</option>
                  <option value="Islamic Books">Islamic Books</option>
                  <option value="Modest Wear">Modest Wear</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">Price (PKR):</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-200 mb-1">Original Price (PKR):</label>
                  <input
                    type="number"
                    value={prodOrigPrice}
                    onChange={(e) => setProdOrigPrice(Number(e.target.value))}
                    className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Image URL:</label>
                <input
                  type="text"
                  value={prodImg}
                  onChange={(e) => setProdImg(e.target.value)}
                  className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Description:</label>
                <textarea
                  rows={2}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full bg-red-900 text-white p-2 rounded-xl text-xs border border-amber-500/40 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-red-900 text-red-200 py-2 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 text-red-950 font-bold py-2 rounded-xl text-xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
