import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart, X, Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import "./App.css";

// Constants for buy links
const BUY_LINK = "https://tally.so/r/Y5WKL0";

// Asset URLs
const ASSETS = {
  logoVideo: "https://customer-assets.emergentagent.com/job_birria-heaven/artifacts/qsy5lzn8_logo%20animation.webm",
  soloSlider: process.env.PUBLIC_URL + "/solo-slider.png",
  doubleSlider: process.env.PUBLIC_URL + "/double-slider.png",
};

// Products data
const PRODUCTS = [
  {
    id: "solo",
    name: "SOLO BOMB",
    price: "₱65",
    description: "A birria brisket slider made with tender shredded beef, Filipino chiles, and melted cheese, finished with a light glaze and served with warm consome for dipping.",
    bgWord: "SOLO",
    image: ASSETS.soloSlider,
  },
  {
    id: "double",
    name: "DOUBLE BOMB",
    price: "₱100",
    description: "Two birria brisket sliders with melted cheese and a savory glaze, paired with a side of rich consome for a fuller, shareable serving.",
    bgWord: "DOUBLE",
    image: ASSETS.doubleSlider,
  },
];

// Navigation Component
const Navigation = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brand-bg/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            data-testid="nav-logo"
            onClick={() => scrollToSection("home")}
            className="font-header text-lg md:text-xl text-brand-red tracking-wide hover:brightness-110 transition-all"
          >
            RED POT
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              data-testid="nav-link-order"
              onClick={() => scrollToSection("order")}
              className={`relative font-header text-sm tracking-wide transition-colors ${
                activeSection === "order" ? "text-brand-white" : "text-brand-text hover:text-brand-white"
              }`}
            >
              Order
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-brand-red transition-all duration-300 ${
                  activeSection === "order" ? "w-full" : "w-0"
                }`}
              />
            </button>
            <button
              data-testid="nav-link-about"
              onClick={() => scrollToSection("about")}
              className={`relative font-header text-sm tracking-wide transition-colors ${
                activeSection === "about" ? "text-brand-white" : "text-brand-text hover:text-brand-white"
              }`}
            >
              About
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-brand-red transition-all duration-300 ${
                  activeSection === "about" ? "w-full" : "w-0"
                }`}
              />
            </button>
          </div>

          {/* Right side - Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              data-testid="cart-icon"
              className="text-brand-text hover:text-brand-white transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-brand-text hover:text-brand-white transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-bg/95 backdrop-blur-sm py-4">
            <button
              data-testid="mobile-nav-link-order"
              onClick={() => scrollToSection("order")}
              className="block w-full text-left font-header text-sm tracking-wide text-brand-text hover:text-brand-red transition-colors py-2"
            >
              Order
            </button>
            <button
              data-testid="mobile-nav-link-about"
              onClick={() => scrollToSection("about")}
              className="block w-full text-left font-header text-sm tracking-wide text-brand-text hover:text-brand-red transition-colors py-2"
            >
              About
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle video - don't loop, stay on last frame
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        video.play().catch(() => setVideoError(true));
      };
      
      const handleEnded = () => {
        setVideoEnded(true);
        // Keep showing the last frame - video stays paused at end
      };
      
      const handleError = () => {
        setVideoError(true);
      };
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('error', handleError);
      
      // Set a timeout - if video doesn't load in 3 seconds, show fallback
      const timeout = setTimeout(() => {
        if (video.readyState < 2) {
          setVideoError(true);
        }
      }, 3000);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('error', handleError);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
    <div className="relative">
        {/* Top to bottom gradient mask */}
      <div className="pointer-events-none absolute inset-0 z-10
        bg-gradient-to-b from-black to-transparent" />
      {/* Video Logo - 1080px wide, no loop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={animationStarted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[1080px] mb-6 flex justify-center"
      >
        {/* Gradient Circle Behind Video */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] md:w-[680px] md:h-[680px] rounded-full
        bg-[radial-gradient(circle,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.6)_35%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0)_80%)]" />
        </div>
        {!videoError ? (
          <video
            ref={videoRef}
            data-testid="logo-video"
            src={ASSETS.logoVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="relative z-10 w-full h-auto object-contain"
            onError={() => setVideoError(true)}
           
          />
        ) : (
          /* Fallback when video doesn't load */
          <div className="w-full flex items-center justify-center py-20">
            <div className="text-center">
              <span className="font-display text-6xl md:text-8xl text-brand-red">RED POT</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>  

      {/* BIRRIA BOMB Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={animationStarted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <h1
          data-testid="hero-title"
          className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-red tracking-wider"
        >
          BIRRIA BOMB
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={animationStarted ? { width: "100%" } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="h-1 bg-brand-red mt-3 mx-auto"
        />
      </motion.div>
    </section>
  );
};

// Product Card Component - Matching exact reference layout
const ProductCard = ({ product, onBuyClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      data-testid={`product-card-${product.id}`}
      className="relative min-h-[80vh] flex items-center overflow-hidden py-12 md:py-20"
    >
      {/* Background Word - Lower opacity, smaller */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-[18vw] md:text-[14vw] lg:text-[12vw] text-brand-text/[0.06] whitespace-nowrap select-none leading-none"
        >
          {product.bgWord}
        </motion.span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Desktop Layout: BUY NOW left, Image center, Info right */}
        <div className="hidden md:flex md:items-center md:justify-between gap-8">
          {/* Left - BUY NOW Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <button
              data-testid={`buy-now-${product.id}`}
              onClick={() => onBuyClick(product)}
              className="bg-brand-red text-brand-text font-body font-normal tracking-wide px-10 py-3 rounded-full hover:brightness-110 transition-all"
            >
              BUY NOW
            </button>
          </motion.div>

          {/* Center - Product Image - Bigger and centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center relative z-20"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-lg object-contain"
              loading="lazy"
            />
          </motion.div>

          {/* Right - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-shrink-0 max-w-xs text-right"
          >
            <p className="text-brand-gold font-body text-lg mb-1">{product.price}</p>
            <h3 className="font-body text-xl text-brand-white mb-1 inline-block">
              {product.name}
              <span className="block h-0.5 bg-brand-gold mt-1"></span>
            </h3>
            <p className="font-body text-sm text-brand-text leading-relaxed mt-3">
              {product.description}
            </p>
          </motion.div>
        </div>

        {/* Mobile Layout: Image → Name with underline → Description → Price → BUY NOW */}
        <div className="md:hidden flex flex-col items-center text-center">
          {/* Product Image - Bigger and centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6 relative z-20"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-sm object-contain mx-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Product Name with Gold Underline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <h3 className="font-body text-xl text-brand-white inline-block">
              {product.name}
              <span className="block h-0.5 bg-brand-gold mt-1"></span>
            </h3>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-body text-sm text-brand-text leading-relaxed mb-4 px-4 max-w-sm"
          >
            {product.description}
          </motion.p>

          {/* Price */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-brand-gold font-body text-lg mb-6"
          >
            {product.price}
          </motion.p>

          {/* BUY NOW Button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            data-testid={`buy-now-mobile-${product.id}`}
            onClick={() => onBuyClick(product)}
            className="bg-brand-red text-brand-text font-body tracking-wide px-10 py-3 rounded-full hover:brightness-110 transition-all"
          >
            BUY NOW
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Order Section Component
const OrderSection = ({ onBuyClick }) => {
  return (
    <section id="order" data-testid="order-section" className="py-8">
      {PRODUCTS.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onBuyClick={onBuyClick}
        />
      ))}
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      data-testid="about-section"
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          data-testid="about-title"
          className="font-body text-2xl md:text-3xl text-brand-white mb-8 text-center"
        >
          About Red Pot Kitchen
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 font-body text-sm md:text-base text-brand-text leading-relaxed"
        >
          <p>
            Red Pot Kitchen is a food concept focused on creating bold, flavorful comfort food designed for students and everyday consumers. Built on the idea of accessibility and quality, the brand aims to deliver satisfying meals that balance affordability with strong taste and consistent presentation.
          </p>
          <p>
            The company was founded with the goal of transforming trending food concepts into practical, locally adapted products. By using Filipino ingredients and efficient cooking methods, Red Pot Kitchen develops dishes that remain enjoyable even after some time, making them ideal for busy environments. The signature birria sliders represent this vision by combining slow cooked brisket, locally sourced chiles, and cheese in a compact finger food format.
          </p>
          <p>
            Red Pot Kitchen prioritizes a clear production process from sourcing to service, ensuring that each product maintains flavor, texture, and value. The brand continues to focus on innovation, adapting global food trends into approachable offerings that suit the taste and lifestyle of its customers.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer data-testid="footer" className="py-8 border-t border-brand-text/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <p className="font-body text-xs text-brand-text/60">
          &copy; {new Date().getFullYear()} Red Pot Kitchen. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Order Modal Component
const OrderModal = ({ isOpen, onClose, product }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        data-testid="order-modal"
        className="bg-brand-bg border-brand-text/20 max-w-2xl w-[95vw] h-full md:h-auto"
      >
        <DialogHeader>
          <DialogTitle className="font-body text-brand-white text-xl">
            Order {product?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
           {product && (
            <iframe
              title="Order form"
              src={`https://tally.so/r/Y5WKL0?transparentBackground=1&hideTitle=1&product=${encodeURIComponent(product.id)}`}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};


// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState("home");
const [modalOpen, setModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

useEffect(() => {
const existing = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
if (existing) return;

const s = document.createElement("script");
s.src = "https://tally.so/widgets/embed.js";
s.async = true;
document.body.appendChild(s);


}, []);

useEffect(() => {
const handleScroll = () => {
const sections = ["home", "order", "about"];
const scrollPosition = window.scrollY + window.innerHeight / 2;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const element = document.getElementById(section);
    if (element) {
      const { offsetTop } = element;
      if (scrollPosition >= offsetTop) {
        setActiveSection(section);
        break;
      }
    }
  }
};

window.addEventListener("scroll", handleScroll);
handleScroll();
return () => window.removeEventListener("scroll", handleScroll);


}, []);

const handleBuyClick = (product) => {
setSelectedProduct(product);
setModalOpen(true);
};

const handleCloseModal = () => {
setModalOpen(false);
setSelectedProduct(null);
};

return (
<div className="min-h-screen bg-brand-bg" data-testid="app-container">
<Navigation activeSection={activeSection} />
<main>
<HeroSection />
<OrderSection onBuyClick={handleBuyClick} />
<AboutSection />
</main>
<Footer />
<OrderModal isOpen={modalOpen} onClose={handleCloseModal} product={selectedProduct} />
</div>
);
}

export default App;
