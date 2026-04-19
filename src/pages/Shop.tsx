import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { ShoppingCart, Heart, Search, Filter, ShoppingBag, ArrowRight, Star, X, Send, User as UserIcon, Flame, Zap, Box, Plus, Minus, CreditCard } from 'lucide-react';
import { BioFeedbackHUD } from '../components/BioFeedbackHUD';
import { BioLoadSimulator } from '../components/BioLoadSimulator';

interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: any;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  tag?: string;
  description: string;
  stock: number; // 0-100 percentage or count
  specs: {
    label: string;
    value: string;
  }[];
}

const products: Product[] = [
  {
    id: "pw-isolate",
    name: "Pure Whey Isolate",
    price: 45.99,
    category: "Supplements",
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1579722821273-0fddc2756b30?q=80&w=800&auto=format"
    ],
    tag: "Best Seller",
    description: "Multi-filtered protein for rapid absorption and maximum muscle recovery.",
    specs: [
      { label: "Purity", value: "98.5%" },
      { label: "Absorp.", value: "Instant" },
      { label: "Dosage", value: "30g" }
    ]
  },
  {
    id: "fr-bands",
    name: "Fabric Resistance Bands",
    price: 24.50,
    category: "Equipment",
    stock: 82,
    images: [
      "https://images.unsplash.com/photo-1599058917233-a799583b6f00?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format"
    ],
    tag: "Student Choice",
    description: "Non-slip fabric loops for metabolic conditioning and glute activation.",
    specs: [
      { label: "Durab.", value: "Grade A+" },
      { label: "Levels", value: "3 Pack" },
      { label: "Material", value: "Latex-Free" }
    ]
  },
  {
    id: "hd-dumbbells",
    name: "Heavy Duty Dumbbells",
    price: 89.00,
    category: "Equipment",
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format"
    ],
    tag: "Elite",
    description: "Professional grade urethane coated dumbbells for heavy lifting.",
    specs: [
      { label: "Coating", value: "Urethane" },
      { label: "Grip", value: "Knurled" },
      { label: "Weight", value: "5kg-40kg" }
    ]
  },
  {
    id: "pi-preworkout",
    name: "Pre-Workout Ignition",
    price: 32.99,
    category: "Supplements",
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1583000292271-d501f1f82b8c?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format"
    ],
    tag: "New Arrivals",
    description: "Zero-sugar formula designed to optimize cognitive focus and explosive power.",
    specs: [
      { label: "Caffeine", value: "250mg" },
      { label: "Focus", value: "Nootropic" },
      { label: "Flavor", value: "Arctic Ice" }
    ]
  },
  {
     id: "ef-yoga-mat",
     name: "Eco-Friendly Yoga Mat",
     price: 38.00,
     category: "Accessories",
     stock: 67,
     images: [
       "https://images.unsplash.com/photo-1599447421416-3414502d18a5?q=80&w=800&auto=format",
       "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=800&auto=format",
       "https://images.unsplash.com/photo-1518611012118-2960520ee4ea?q=80&w=800&auto=format"
     ],
     description: "Biodegradable TPE material with laser-etched alignment guides.",
     specs: [
       { label: "Material", value: "Eco-TPE" },
       { label: "Thick.", value: "6mm" },
       { label: "Grip", value: "High-Traction" }
     ]
   },
   {
     id: "p-creatine",
     name: "Premium Creatine",
     price: 22.99,
     category: "Supplements",
     stock: 94,
     images: [
       "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format",
       "https://images.unsplash.com/photo-1579722822416-5b4d75471676?q=80&w=800&auto=format",
       "https://images.unsplash.com/photo-1579722821273-0fddc2756b30?q=80&w=800&auto=format"
     ],
     description: "Micronized creatine monohydrate for increased ATP production and cellular hydration.",
     specs: [
       { label: "Type", value: "Micronized" },
       { label: "Purity", value: "99.9%" },
       { label: "Servings", value: "60" }
     ]
   }
];

const TacticalInspector = ({ product }: { product: Product }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotation(prev => ({ ...prev, y: prev.y + 1 }));
    }, 50);
    return () => clearInterval(interval);
  }, [isRotating]);

  return (
    <div className="relative w-full aspect-square bg-[#010309] rounded-[3rem] border border-amber-500/10 overflow-hidden group cursor-grab active:cursor-grabbing">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      {/* HUD Overlays */}
      <div className="absolute inset-8 pointer-events-none flex flex-col justify-between z-20">
         <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.3em] flex items-center gap-2">
                 <Box size={12} /> Tactical 3D HUD
               </span>
               <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Model: {product.id.toUpperCase()} // REV_4</span>
            </div>
            <div className="flex flex-col items-end gap-1">
               <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest">Projection: STABLE</span>
               <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">X: {rotation.x.toFixed(1)}° Y: {rotation.y.toFixed(1)}°</span>
            </div>
         </div>
         <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                  <span className="text-[8px] font-black text-amber-500/40 uppercase tracking-widest">Live Scanning...</span>
               </div>
               <p className="text-[7px] font-black text-slate-800 uppercase tracking-[0.4em] max-w-[150px]">Geometric alignment complete. Thermal gradients operational.</p>
            </div>
            <button 
              onClick={() => setIsRotating(!isRotating)}
              className="pointer-events-auto bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all shadow-xl"
            >
              {isRotating ? 'Halt Rotation' : 'Resume Sync'}
            </button>
         </div>
      </div>

      {/* Main 3D Projection Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: '1200px' }}>
        <motion.div
           drag
           dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
           onDrag={(_, info) => {
             setIsRotating(false);
             setRotation(prev => ({
               x: prev.x - info.delta.y * 0.5,
               y: prev.y + info.delta.x * 0.5
             }));
           }}
           style={{ 
             rotateX: rotation.x, 
             rotateY: rotation.y,
             transformStyle: 'preserve-3d'
           }}
           className="relative w-64 h-64 pointer-events-auto"
        >
          {/* Holographic Product Layer */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(50px)' }}>
            <img 
               src={product.images[0]} 
               alt={product.name}
               className="w-full h-full object-contain filter grayscale brightness-125 contrast-150 mix-blend-screen opacity-90 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
               referrerPolicy="no-referrer"
            />
          </div>

          {[0, 120, 240].map((angle) => (
             <div 
               key={angle}
               className="absolute inset-0 border border-amber-500/20 rounded-full pointer-events-none"
               style={{ transform: `rotateY(${angle}deg) rotateX(90deg)` }}
             />
          ))}

          {/* Tactical Callouts */}
          <div className="absolute top-0 right-0 whitespace-nowrap" style={{ transform: 'translateZ(100px)' }}>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]" />
                <div className="flex flex-col border-l border-amber-500/40 pl-3 backdrop-blur-md bg-black/20 p-2 rounded-r-lg">
                   <span className="text-[7px] font-black text-amber-500 uppercase">Pivot: {product.specs[0].label}</span>
                   <span className="text-[10px] font-black text-white italic">{product.specs[0].value}</span>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Surface Shadow */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-8 bg-amber-500/10 blur-2xl rounded-full" />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(245,158,11,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_4s_linear_infinite]" />
    </div>
  );
};

const ImageZoom = ({ src, alt }: { src: string; alt: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div 
      className="relative w-full h-full cursor-zoom-in overflow-hidden rounded-2xl"
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-300"
        style={{
          transform: showZoom ? 'scale(1.5)' : 'scale(1)',
          transformOrigin: `${position.x}% ${position.y}%`
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const ReviewSection = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Since we removed Firebase and this is a mini-project focusing on auth & economy,
  // we will mock the reviews fetching to show UI without building a new schema just for reviews.
  useEffect(() => {
     setReviews([
        {
          id: '1',
          productId: productId,
          userId: 'mock_1',
          userName: 'GhostProtocol_44',
          rating: 5,
          comment: 'Incredible biological resonance. Increased output by 12% on first cycle.',
          createdAt: new Date().toISOString()
        }
     ])
  }, [productId]);

  const avgRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "0.0";
  
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // Mock the submission to prevent TS / Auth errors without a database endpoint
    setTimeout(() => {
       setIsSubmitting(false);
       setNewComment("");
       alert("Feedback synced locally.");
    }, 500);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Rating Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 pb-8 md:pb-0">
          <span className="text-6xl font-black text-slate-900 tracking-tighter mb-2">{avgRating}</span>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={18} 
                className={star <= Math.round(Number(avgRating)) ? 'text-amber-400' : 'text-slate-200'} 
                fill={star <= Math.round(Number(avgRating)) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{reviews.length} Verified Reviews</span>
        </div>
        
        <div className="col-span-1 md:col-span-2 flex flex-col gap-3 justify-center">
          {ratingCounts.map((rc) => (
            <div key={rc.star} className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-400 w-12 uppercase tracking-widest">{rc.star} Stars</span>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${rc.percentage}%` }}
                  className="h-full bg-amber-400 rounded-full"
                />
              </div>
              <span className="text-[10px] font-black text-slate-400 w-10 text-right uppercase tracking-widest">{rc.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-8">
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 italic">Feedback Sync</h4>
        
        {localStorage.getItem('vanguard_user') ? (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-100 shadow-sm p-8 rounded-[2rem] mb-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className={`transition-all hover:scale-110 ${star <= newRating ? 'text-amber-400' : 'text-slate-200'}`}
                  >
                    <Star size={24} fill={star <= newRating ? 'currentColor' : 'none'} />
                  </button>
                ))}
                <span className="text-xs font-black text-slate-900 ml-4 uppercase tracking-widest">Rate this gear</span>
              </div>
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your technical feedback with the collective..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-600 resize-none h-32 transition-all"
                />
                <button
                  disabled={isSubmitting || !newComment.trim()}
                  className="absolute bottom-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-black disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  Post Review <Send size={14} />
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-slate-50 p-10 rounded-[2.5rem] mb-12 text-center border-2 border-dashed border-slate-200">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-loose">Access Restricted. <br/> Please authorize session to submit feedback.</p>
          </div>
        )}

        <div className="space-y-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <motion.div 
                key={review.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-6 p-8 rounded-[2rem] border border-slate-50 hover:bg-slate-50/50 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                  <UserIcon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{review.userName}</span>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Verified Student Athlete</p>
                    </div>
                    <div className="flex gap-0.5 bg-white px-2 py-1 rounded-full border border-slate-100 shadow-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={10} 
                          className={star <= review.rating ? 'text-amber-400' : 'text-slate-200'} 
                          fill={star <= review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic">"{review.comment}"</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-slate-400 italic text-center py-10 opacity-60">Null set. Be the first to try this gear.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const bundles = [
  { id: 'starter', name: 'Rookie Protocol', items: ['Whey Isolate', 'Shakers'], price: 49.99, saved: '15%', icon: Zap },
  { id: 'pro', name: 'Neural Overload', items: ['Whey Isolate', 'Pre-Workout', 'Creatine'], price: 89.99, saved: '22%', icon: Flame },
  { id: 'elite', name: 'Vanguard Elite', items: ['Dumbbells', 'Mat', 'Resistance Bands'], price: 199.99, saved: '30%', icon: ShoppingBag },
];

interface CartItem extends Product {
  quantity: number;
}

export default function Shop({ user }: { user?: any }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeTab, setActiveTab] = useState("details");
  const [activeBundle, setActiveBundle] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Traditional Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'success'>('form');

  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('vanguard_shop_tutorial');
    if (!hasSeenTutorial) {
      setTimeout(() => setShowTutorial(true), 1500);
    }
  }, []);

  const dismissTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('vanguard_shop_tutorial', 'true');
  };

  const tutorialSteps = [
    {
      title: "Tactical Induction",
      desc: "Welcome to the Supply Sector. Here you can requisition high-performance gear for your physical evolution.",
      element: "header",
    },
    {
      title: "Strategy Filters",
      desc: "Use these sectors to filter assets by your current combat focus: Supplements, Equipment, or Accessories.",
      element: "filters",
    },
    {
      title: "Logistics Priority",
      desc: "Optimize your view by sorting assets based on cost effectiveness or supply arrival data.",
      element: "sort",
    },
    {
      title: "Asset Inspection",
      desc: "Hover over any item to launch the Tactical 3D HUD for deep geometric inspection.",
      element: "product",
    },
    {
      title: "Final Requisition",
      desc: "Manage your supply manifest here. All transactions are secured via neural-stripe pathways.",
      element: "cart",
    }
  ];

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = user ? cartTotal * 0.15 : 0; // 15% discount if logged in
  const finalTotal = cartTotal - discountAmount;

  const handleCheckoutInit = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
    setCheckoutStep('form');
  };

  const processPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('processing');
    
    // Simulate API Payment Processing via Stripe
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setCart([]);
    setCheckoutStep('success');
    
    // Auto-close after success
    setTimeout(() => {
      setIsCheckoutModalOpen(false);
      setCheckoutStep('form');
    }, 4000);
  };

  const sortedProducts = [...products]
    .filter(p => {
      const categoryMatch = activeCategory === "All" || p.category === activeCategory;
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "newest") return products.indexOf(b) - products.indexOf(a); // Simple proxy for newest
      return 0;
    });

  const categories = ["All", "Supplements", "Equipment", "Accessories"];

  return (
    <div className="flex flex-col gap-10 relative">
      {/* Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(245,158,11,0.2)] p-10 overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-4">
                   <button onClick={dismissTutorial} className="text-slate-600 hover:text-white transition-colors"><X size={20}/></button>
                </div>

                <div className="flex flex-col gap-6 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg shadow-amber-500/20">
                         <Zap size={24} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Module {tutorialStep + 1} / {tutorialSteps.length}</p>
                         <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{tutorialSteps[tutorialStep].title}</h3>
                      </div>
                   </div>

                   <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-relaxed">
                     {tutorialSteps[tutorialStep].desc}
                   </p>

                   <div className="flex gap-4 mt-4">
                      {tutorialStep > 0 ? (
                        <button 
                          onClick={() => setTutorialStep(tutorialStep - 1)}
                          className="flex-1 py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
                        >
                           Previous
                        </button>
                      ) : (
                        <button 
                          onClick={dismissTutorial}
                          className="flex-1 py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white/5 transition-all"
                        >
                           Dismiss
                        </button>
                      )}
                      
                      {tutorialStep < tutorialSteps.length - 1 ? (
                        <button 
                          onClick={() => setTutorialStep(tutorialStep + 1)}
                          className="flex-1 py-4 bg-amber-500 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:bg-white transition-all"
                        >
                           Continue
                        </button>
                      ) : (
                        <button 
                          onClick={dismissTutorial}
                          className="flex-1 py-4 bg-emerald-500 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-white transition-all"
                        >
                           Begin Recon
                        </button>
                      )}
                   </div>
                </div>

                {/* Animated Scanline for flavor */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                   <div className="w-full h-px bg-amber-500 absolute top-0 animate-[scan_3s_infinite]" />
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Interactive Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {/* Cursor Tracking Spotlight */}
        <motion.div 
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background: useMotionTemplate`radial-gradient(1000px circle at ${springX}px ${springY}px, rgba(245,158,11,0.06), transparent 50%)`
          }}
        />
        
        {/* Scroll Parallax Grid */}
        <motion.div
          className="absolute inset-[-100%] opacity-[0.015]"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            y: y1 
          }}
        />
      </div>

      {/* Slide-out Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[200] flex justify-end">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setIsCartOpen(false)}
               className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
             />
             <motion.div 
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="relative w-full max-w-md bg-slate-900 h-full border-l border-white/10 shadow-2xl flex flex-col pt-safe-top"
             >
               <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-950/40">
                  <div className="flex items-center gap-3">
                     <ShoppingCart size={20} className="text-amber-500" />
                     <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Logistics Cart</h2>
                     <span className="bg-amber-500 text-slate-900 text-[10px] font-black rounded-full px-2 py-0.5">{cart.length}</span>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                     <X size={20} />
                  </button>
               </div>

               <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 opacity-50">
                       <ShoppingCart size={48} className="text-slate-600 mb-4" />
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cart is empty.</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl relative group">
                         <div className="w-20 h-20 bg-slate-950 rounded-xl overflow-hidden shrink-0">
                           <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                         </div>
                         <div className="flex flex-col flex-1 justify-between">
                            <div>
                               <h3 className="text-sm font-black text-white leading-tight uppercase italic mb-1 truncate">{item.name}</h3>
                               <p className="text-[10px] font-black text-amber-500">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                               <div className="flex items-center gap-3 bg-slate-950 px-2 py-1 rounded-lg border border-white/5">
                                 <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-amber-500 transition-colors"><Minus size={12} /></button>
                                 <span className="text-[10px] font-black w-4 text-center text-white">{item.quantity}</span>
                                 <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-amber-500 transition-colors"><Plus size={12} /></button>
                               </div>
                            </div>
                         </div>
                      </div>
                    ))
                  )}
               </div>

               {cart.length > 0 && (
                 <div className="p-6 bg-slate-950 border-t border-white/5">
                    <div className="flex flex-col gap-3 mb-6 relative z-10">
                       <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-widest">
                         <span>Subtotal</span>
                         <span>${cartTotal.toFixed(2)}</span>
                       </div>
                       {user && (
                         <div className="flex justify-between text-xs text-emerald-500 font-bold uppercase tracking-widest">
                           <span className="flex items-center gap-2"><ArrowRight size={12}/> Student Prime (15%)</span>
                           <span>-${discountAmount.toFixed(2)}</span>
                         </div>
                       )}
                       <div className="flex justify-between text-lg text-white font-black uppercase tracking-tighter italic border-t border-white/10 pt-3">
                         <span>Total Due</span>
                         <span className="text-amber-500">${finalTotal.toFixed(2)}</span>
                       </div>
                    </div>

                    <AnimatePresence>
                      {checkoutStatus && (
                         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-black uppercase tracking-widest text-center rounded-xl mb-4">
                           {checkoutStatus}
                         </motion.div>
                      )}
                    </AnimatePresence>

                    <button 
                      onClick={handleCheckoutInit} 
                      className="btn-primary w-full py-5 flex items-center justify-center gap-3 active:scale-95 transition-all text-xs"
                    >
                       <CreditCard size={18} />
                       Secure Checkout via Fiat
                    </button>
                    <p className="text-center text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-4">Transactions secured by Stripe Engine Simulation.</p>
                 </div>
               )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full-Screen Secure Checkout Overlay */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
             />
             
             <motion.div 
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: -20 }}
               className="relative w-full max-w-4xl bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row min-h-[60vh]"
             >
               {checkoutStep !== 'success' && (
                 <button 
                   onClick={() => setIsCheckoutModalOpen(false)}
                   className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-slate-500 hover:text-amber-500 transition-colors border border-white/10"
                 >
                   <X size={20} />
                 </button>
               )}

               {checkoutStep === 'success' ? (
                 <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden bg-[#020617]">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)] pointer-events-none" />
                   <motion.div 
                     initial={{ scale: 0, rotate: -180 }}
                     animate={{ scale: 1, rotate: 0 }}
                     transition={{ type: "spring", stiffness: 200, damping: 20 }}
                     className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)] mb-8 border-4 border-emerald-400"
                   >
                     <ShoppingCart size={40} className="text-slate-900 relative right-1" />
                     <div className="absolute -bottom-2 -right-2 bg-slate-900 rounded-full p-2 border border-white/10">
                        <Send size={16} className="text-emerald-500" />
                     </div>
                   </motion.div>
                   <motion.h2 
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                     className="text-4xl font-black text-white italic tracking-tighter uppercase mb-4"
                   >
                     Transaction Approved
                   </motion.h2>
                   <motion.p 
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                     className="text-slate-400 font-bold uppercase tracking-widest text-xs max-w-md"
                   >
                     Fiat transfer verified natively via neural-stripe pathways. Physical logistics have been deployed.
                   </motion.p>
                 </div>
               ) : (
                 <>
                   {/* Left Checkout Summary */}
                   <div className="w-full md:w-[40%] bg-slate-950 p-10 border-r border-white/5 flex flex-col justify-between">
                      <div>
                         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4 mb-6">Order Manifest</h3>
                         <div className="flex flex-col gap-4 mb-8">
                            {cart.map(item => (
                               <div key={item.id} className="flex justify-between items-center text-sm font-bold">
                                  <span className="text-slate-300 truncate pr-4">{item.quantity}x {item.name}</span>
                                  <span className="text-slate-500">${(item.price * item.quantity).toFixed(2)}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                      
                      <div className="flex flex-col gap-4 pt-6 border-t border-white/5">
                         <div className="flex justify-between text-xs text-slate-500 font-bold uppercase tracking-widest">
                           <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                         </div>
                         {user && (
                           <div className="flex justify-between text-xs text-emerald-500 font-bold uppercase tracking-widest">
                             <span>Student Discount</span><span>-${discountAmount.toFixed(2)}</span>
                           </div>
                         )}
                         <div className="flex justify-between text-2xl text-white font-black italic tracking-tighter pt-4">
                           <span>Total Due</span><span className="text-amber-500">${finalTotal.toFixed(2)}</span>
                         </div>
                      </div>
                   </div>

                   {/* Right Checkout Form */}
                   <div className="flex-1 p-10 lg:p-14 relative flex flex-col justify-center">
                     {checkoutStep === 'processing' ? (
                        <div className="flex flex-col items-center justify-center absolute inset-0">
                           <motion.div 
                             animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                             className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 mb-6"
                           />
                           <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Contacting Secure Stripe Node...</p>
                        </div>
                     ) : (
                        <form onSubmit={processPayment} className="flex flex-col gap-6">
                           <div className="mb-4">
                             <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2">Secure Transfer</h2>
                             <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.3em]">End-to-End Encrypted Handshake</p>
                           </div>

                           <div className="flex flex-col gap-2">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Cardholder Name</label>
                             <input type="text" placeholder="OPERATOR REGISTRATION" required className="bg-slate-950 border border-white/10 px-5 py-4 rounded-xl text-white text-xs font-bold focus:border-amber-500 outline-none transition-colors w-full placeholder:text-slate-700 uppercase" />
                           </div>

                           <div className="flex flex-col gap-2">
                             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Card Number</label>
                             <div className="relative">
                               <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                               <input type="text" placeholder="0000 0000 0000 0000" pattern="[0-9\s]{13,19}" maxLength={19} required className="bg-slate-950 border border-white/10 pl-12 pr-5 py-4 rounded-xl text-white text-xs font-bold focus:border-amber-500 outline-none transition-colors w-full placeholder:text-slate-700 tracking-widest" />
                             </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                             <div className="flex flex-col gap-2">
                               <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Expiration</label>
                               <input type="text" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/?([0-9]{2})" maxLength={5} required className="bg-slate-950 border border-white/10 px-5 py-4 rounded-xl text-white text-xs font-bold focus:border-amber-500 outline-none transition-colors w-full placeholder:text-slate-700 tracking-widest" />
                             </div>
                             <div className="flex flex-col gap-2">
                               <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">CVC Code</label>
                               <input type="text" placeholder="***" pattern="[0-9]{3,4}" maxLength={4} required className="bg-slate-950 border border-white/10 px-5 py-4 rounded-xl text-white text-xs font-bold focus:border-amber-500 outline-none transition-colors w-full placeholder:text-slate-700 tracking-widest" />
                             </div>
                           </div>

                           <button type="submit" className="btn-primary py-5 mt-6 w-full flex items-center justify-center gap-3">
                              Process Payment of ${finalTotal.toFixed(2)} <ArrowRight size={16} />
                           </button>
                        </form>
                     )}
                   </div>
                 </>
               )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header id="tutorial-header" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5 relative z-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2 italic uppercase">Supply Drop</h1>
          <p className="text-slate-500 font-medium text-lg">Acquire high-performance biological and mechanical gear.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="flex items-center gap-4">
             <div id="tutorial-filters" className="flex bg-white/5 p-1 rounded-xl border border-white/10 shadow-inner hidden lg:flex">
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-500 hover:text-white'}`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
             <button 
               id="tutorial-cart"
               onClick={() => setIsCartOpen(true)}
               className="flex items-center gap-3 bg-slate-900 border border-white/10 px-5 py-3 rounded-2xl shadow-lg hover:border-amber-500/50 hover:bg-slate-800 transition-all cursor-pointer relative"
             >
               <ShoppingCart size={18} className="text-slate-400" />
               <div className="flex flex-col text-left hidden sm:flex">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 leading-none mb-1">LOGISTICS CART</span>
                  <span className="text-sm font-black text-white italic leading-none">${finalTotal.toFixed(2)}</span>
               </div>
               {cart.length > 0 && (
                 <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-900 w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black border-2 border-slate-900 shadow-lg">
                   {cart.length}
                 </span>
               )}
             </button>
           </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <div id="tutorial-sort" className="relative group w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={17} />
            <input 
              type="text" 
              placeholder="Search telemetry..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-6 py-3 bg-white/5 border border-white/10 rounded-xl w-full md:w-64 focus:ring-2 focus:ring-amber-500/50 outline-none font-bold placeholder:text-slate-600 text-white text-sm shadow-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 shadow-sm">
            <Filter size={16} className="text-slate-500" />
            <select 
              id="tutorial-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm font-black text-slate-400 outline-none cursor-pointer uppercase tracking-widest"
            >
              <option value="default" className="bg-slate-900">Default Auth</option>
              <option value="price-low" className="bg-slate-900">Price: ASC</option>
              <option value="price-high" className="bg-slate-900">Price: DESC</option>
              <option value="newest" className="bg-slate-900">Latest Sync</option>
            </select>
          </div>
        </div>
      </header>

      {/* Tactical Configuration: Bundles */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Zap size={16} className="text-amber-500" />
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Tactical Configuration</h3>
          </div>
          <span className="text-[9px] font-bold text-amber-500/60 uppercase tracking-widest italic animate-pulse">Optimizer Active</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {bundles.map((bundle) => (
             <motion.button
               key={bundle.id}
               whileHover={{ y: -4 }}
               onClick={() => setActiveBundle(activeBundle === bundle.id ? null : bundle.id)}
               className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden group ${activeBundle === bundle.id ? 'bg-amber-500 border-amber-500 shadow-2xl shadow-amber-500/30' : 'bg-white/5 border-white/5 hover:border-amber-500/20'}`}
             >
               <div className="relative z-10">
                 <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl transition-all ${activeBundle === bundle.id ? 'bg-slate-900 text-amber-500' : 'bg-white/5 text-slate-500 group-hover:text-amber-500'}`}>
                       <bundle.icon size={20} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${activeBundle === bundle.id ? 'bg-slate-900 text-amber-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      -{bundle.saved}
                    </span>
                 </div>
                 <h4 className={`text-xl font-black italic uppercase tracking-tighter mb-1 transition-all ${activeBundle === bundle.id ? 'text-slate-950' : 'text-white'}`}>
                   {bundle.name}
                 </h4>
                 <div className="flex gap-2 flex-wrap mt-4">
                    {bundle.items.map(item => (
                      <span key={item} className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${activeBundle === bundle.id ? 'bg-slate-950/10 border-slate-950/20 text-slate-900' : 'bg-white/5 border-white/5 text-slate-500'}`}>
                        {item}
                      </span>
                    ))}
                 </div>
               </div>
               {activeBundle === bundle.id && (
                 <motion.div layoutId="bundleScan" className="absolute inset-0 bg-white/10 pointer-events-none" />
               )}
             </motion.button>
           ))}
        </div>
      </section>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {sortedProducts.map((product, idx) => (
          <motion.div 
            key={product.id}
            id={idx === 0 ? "tutorial-product" : undefined}
            whileHover={{ 
              y: -8, 
              transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
            }}
            onClick={() => {
              setSelectedProduct(product);
              setActiveImageIndex(0);
            }}
            className="group flex flex-col h-full bento-card overflow-hidden border-white/5 hover:border-amber-500/40 cursor-pointer relative transition-all duration-500 hover:shadow-[0_20px_50px_rgba(245,158,11,0.1)]"
          >
            {/* Scan Overlay Effect */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <div className="w-full h-[2px] bg-amber-500/30 absolute top-0 animate-[scan_2s_infinite] shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
               <div className="absolute top-4 right-4 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 px-3 py-1.5 rounded-lg shadow-xl">
                 <span className="text-[8px] font-black text-amber-500 uppercase tracking-[0.2em] animate-pulse">Syncing Telemetry...</span>
               </div>
            </div>

            <div className="aspect-[4/5] relative bg-slate-950 overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-70 filter grayscale group-hover:grayscale-0 contrast-125 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              
              <button 
                onClick={(e) => { e.stopPropagation(); /* Wishlist */ }}
                className="absolute top-4 left-4 z-20 w-10 h-10 bg-slate-900/40 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-amber-500 hover:text-slate-900 translate-y-2 group-hover:translate-y-0"
              >
                <Heart size={18} className="transition-colors" />
              </button>

              {product.tag && (
                <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg italic shadow-[0_0_20px_rgba(245,158,11,0.4)] translate-x-2 group-hover:translate-x-0 transition-transform duration-500">
                  {product.tag}
                </div>
              )}

              {/* Tech-Spec Overlay Reveal */}
              <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100 pointer-events-none">
                <div className="bg-slate-900/40 backdrop-blur-2xl border border-amber-500/10 p-5 rounded-2xl flex flex-col gap-3 shadow-2xl">
                   <p className="text-[8px] font-black text-amber-500 uppercase tracking-[0.3em] italic border-b border-white/5 pb-2">Tactical Tech-Specs</p>
                   <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                      {product.specs.map(spec => (
                        <div key={spec.label} className="flex flex-col">
                           <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">{spec.label}</span>
                           <span className="text-[10px] font-black text-white italic truncate">{spec.value}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Stock Telemetry Bar */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">Supply Reserve</span>
                    <span className={`text-[8px] font-black uppercase tracking-widest ${product.stock < 25 ? 'text-rose-500 animate-pulse' : 'text-amber-500'}`}>{product.stock}%</span>
                 </div>
                 <div className="h-[3px] bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${product.stock}%` }}
                      className={`h-full transition-all duration-1000 ${product.stock < 25 ? 'bg-rose-600' : 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]'}`}
                    />
                 </div>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow gap-6 bg-slate-950/40 group-hover:bg-slate-900/60 transition-all duration-500 relative">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-amber-500/40 uppercase tracking-[0.3em] bg-amber-500/5 px-3 py-1 rounded-md border border-amber-500/10 group-hover:border-amber-500/30 transition-colors uppercase italic">{product.category}</span>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.2em] mb-1">RETAIL</span>
                   <span className="text-2xl font-black text-white italic tracking-tighter group-hover:text-amber-500 transition-colors">${product.price.toFixed(2)}</span>
                </div>
              </div>
              <h3 className="text-xl font-black text-white flex-grow leading-tight uppercase group-hover:tracking-tight transition-all italic">{product.name}</h3>
              
              {/* Technical Specs Preview */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 group-hover:border-amber-500/20 transition-colors">
                 {product.specs.map((spec, i) => (
                   <div key={i} className="flex flex-col gap-1">
                      <span className="text-[7px] font-black text-slate-600 uppercase tracking-[0.2em]">{spec.label}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate group-hover:text-slate-200 transition-colors">{spec.value}</span>
                   </div>
                 ))}
              </div>

              {/* Action Handlers */}
              <button 
                onClick={(e) => addToCart(product, e)}
                className="btn-primary w-full text-[10px] py-4 uppercase tracking-widest shadow-2xl transition-all flex justify-center items-center gap-3 relative overflow-hidden group-hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <ShoppingCart size={16} className="relative z-10" /> 
                <span className="relative z-10">Add to Cart</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/5 backdrop-blur-md shadow-lg border border-white/10 rounded-full flex items-center justify-center text-slate-500 hover:text-amber-500 transition-all active:scale-90"
              >
                <X size={20} />
              </button>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <div className="flex gap-8 border-b border-white/5 mb-10">
                  {['details', 'projection', 'reviews'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-amber-500' : 'text-slate-600 hover:text-white'}`}
                    >
                      {tab}
                      {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'details' ? (
                    <motion.div 
                      key="details"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                    >
                      {/* Left: Gallery & Zoom */}
                      <div className="flex flex-col gap-4">
                        <div className="aspect-square bg-slate-950 rounded-3xl overflow-hidden shadow-inner border border-white/5">
                          <ImageZoom 
                            src={selectedProduct.images[activeImageIndex]} 
                            alt={selectedProduct.name} 
                          />
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                          {selectedProduct.images.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImageIndex(idx)}
                              className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${activeImageIndex === idx ? 'border-amber-500 scale-105 shadow-md' : 'border-white/5 hover:border-white/20'}`}
                            >
                              <img 
                                src={img} 
                                alt={`${selectedProduct.name} angle ${idx + 1}`} 
                                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all"
                                referrerPolicy="no-referrer"
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right: Info */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="stat-pill border-amber-500/20 text-amber-500/60 lowercase">{selectedProduct.category}</span>
                          {selectedProduct.tag && <span className="amber-glass text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md italic">{selectedProduct.tag}</span>}
                        </div>
                        <h2 className="text-4xl font-black text-white mb-4 leading-tight italic uppercase">{selectedProduct.name}</h2>
                        <p className="text-slate-400 font-medium text-lg leading-relaxed mb-10">{selectedProduct.description}</p>
                        
                        <div className="grid grid-cols-2 gap-6 mb-10">
                          <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                             <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Durability</p>
                             <p className="text-xl font-black text-amber-500 italic">Grade A+</p>
                          </div>
                          <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                             <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Materials</p>
                             <p className="text-xl font-black text-amber-500 italic">Eco-Pro</p>
                          </div>
                        </div>

                        <div className="bg-amber-500 p-8 rounded-[2rem] text-slate-900 mb-8 shadow-2xl shadow-amber-500/20 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
                          <div className="relative z-10 flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Retail Price</span>
                            <span className="text-3xl font-black italic tracking-tighter">${selectedProduct.price.toFixed(2)}</span>
                          </div>
                          <p className="relative z-10 text-[11px] text-slate-800 font-bold mb-8 leading-relaxed">Secure transaction initialized. Item will be instantly shipped to user location based on file manifest.</p>
                          <button 
                             onClick={(e) => addToCart(selectedProduct, e)}
                             className="relative z-10 w-full py-5 flex items-center justify-center gap-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50"
                          >
                             <ShoppingCart size={16} /> Add to Cart
                          </button>
                        </div>

                        <div className="flex items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] bg-white/[0.03] p-4 rounded-xl border border-white/5 mt-8">
                           <div className="flex -space-x-2">
                             {[1,2,3].map(i => (
                               <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800" />
                             ))}
                           </div>
                           <span>Verified Syncs (142)</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : activeTab === 'projection' ? (
                    <motion.div
                       key="projection"
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       className="flex flex-col gap-10"
                    >
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                          <TacticalInspector product={selectedProduct} />
                          {selectedProduct.category === 'Equipment' && (
                            <BioLoadSimulator productName={selectedProduct.name} />
                          )}
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {selectedProduct.specs.map((spec, i) => (
                             <div key={i} className="glass-card p-6 border-white/5">
                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-2">{spec.label}</span>
                                <span className="text-lg font-black text-white italic tracking-tighter uppercase">{spec.value}</span>
                             </div>
                          ))}
                       </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <ReviewSection productId={selectedProduct.id as string} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unique Feature: Tactical Supply Bundles */}
      <section className="flex flex-col gap-8">
         <div className="flex flex-col">
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Curated Supply Kits</h2>
            <p className="text-slate-500 font-medium text-sm">Strategic equipment bundles optimized for academic focus areas.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-10 flex border-amber-500/10 hover:border-amber-500/30 transition-all group">
               <div className="flex flex-col gap-6 flex-1">
                  <div className="stat-pill border-amber-500/20 text-amber-500/60 uppercase w-fit">Tactical Strength Kit</div>
                  <h3 className="text-2xl font-black italic text-white uppercase leading-tight tracking-tighter">Hypertrophy Blueprint <br/> Bundle Level 1</h3>
                  <p className="text-slate-500 text-sm font-medium">Includes Elite Dumbbells, Micronized Creatine, and Bio-Isolate. Save 15% automatically at checkout.</p>
                  <button className="flex items-center gap-4 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-6 transition-all">Configure Bundle <ArrowRight size={14}/></button>
               </div>
               <div className="w-32 h-32 bg-amber-500/5 rounded-3xl flex items-center justify-center border border-amber-500/10">
                  <ShoppingBag size={48} className="text-amber-500/20" />
               </div>
            </div>
            <div className="glass-card p-10 flex border-amber-500/10 hover:border-amber-500/30 transition-all group">
               <div className="flex flex-col gap-6 flex-1">
                  <div className="stat-pill border-amber-500/20 text-amber-500/60 uppercase w-fit">Metabolic conditioning</div>
                  <h3 className="text-2xl font-black italic text-white uppercase leading-tight tracking-tighter">Neural Focus <br/> Endurance Kit</h3>
                  <p className="text-slate-500 text-sm font-medium">Includes Resistance Loops, Yoga Surface, and Pre-Workout Ignition. Save 12% automatically at checkout.</p>
                  <button className="flex items-center gap-4 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-6 transition-all">Configure Bundle <ArrowRight size={14}/></button>
               </div>
               <div className="w-32 h-32 bg-amber-500/5 rounded-3xl flex items-center justify-center border border-amber-500/10">
                  <Flame size={48} className="text-amber-500/20" />
               </div>
            </div>
         </div>
      </section>

      <section className="relative overflow-hidden bento-card bg-amber-500/10 p-12 text-white border-amber-500/20 shadow-2xl shadow-amber-500/5 mt-10">
        <div className="absolute inset-0 opacity-20 filter blur-sm">
           <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920" alt="Fitness" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md text-center md:text-left">
            <span className="accent-pill mb-6 inline-block italic">Authentication: Prime</span>
            <h2 className="text-4xl font-black tracking-tight mb-4 leading-tight uppercase italic underline decoration-amber-500 decoration-4 underline-offset-8">Student Prime <br/>Subscription</h2>
            <p className="text-slate-400 font-bold mb-8 leading-relaxed text-sm uppercase tracking-widest opacity-60">Architectural dominance. 20% discount on gear. Early Academy keys across the neural network.</p>
            <button className="flex items-center justify-center md:justify-start gap-4 bg-amber-500 text-slate-900 px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all hover:bg-white mx-auto md:mx-0 shadow-lg shadow-amber-500/20">
              Upgrade Neural Access
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 min-w-[140px] backdrop-blur-md">
              <span className="text-3xl font-black text-amber-500 italic">20%</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Off Shop</span>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 min-w-[140px] backdrop-blur-md">
              <span className="text-3xl font-black text-amber-500 italic">FREE</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Logistics</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



