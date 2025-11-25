import React, { useEffect, useRef, useState, useCallback } from "react";

/*
 * Dynamic version with Scroll-Reveal Animations.
 * - Uses the Intersection Observer API to detect when elements enter the viewport.
 * - Applies Tailwind transition classes for smooth animation.
*/

// --- Helper Component: Animated Section (Observes Scroll) ---
const AnimatedSection = ({ children, className, animationClass = 'animate-fade-up' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.2, // Trigger when 20% of the item is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // It's crucial to check if ref.current still exists before unobserving
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-opacity duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};


// --- Reusable Component Helpers ---

// Component for a reason/highlight bubble
const ReasonBubble = ({ title, description }) => (
  <div className="bg-pink-50 rounded-2xl p-5 text-center shadow-sm h-full flex flex-col items-center justify-center">
    <div className="text-4xl text-rose-500 mb-2">💖</div>
    <h4 className="text-sm font-semibold text-pink-700 mb-1">{title}</h4>
    <p className="text-xs text-gray-600">{description}</p>
  </div>
);

// Component for a photo moment tile
const MomentTile = ({ caption, delay = 0 }) => (
  // Added delay for staggered animation
  <div 
    className={`rounded-xl overflow-hidden shadow-lg group relative transition-transform duration-700 hover:scale-[1.02]`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {/* Placeholder box for the image */}
    <div className="w-full h-48 bg-pink-100 flex items-center justify-center text-pink-600 text-sm">
      [Image Placeholder: {caption}]
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
      <p className="text-sm font-medium text-white drop-shadow">{caption}</p>
    </div>
  </div>
);


// --- Main Component ---

export default function SinuolaBirthdayPage() {

  // For the initial floating animation on the hero button
  const [floating, setFloating] = useState(false);
  useEffect(() => {
    // Start the floating animation slightly after load
    const timer = setTimeout(() => setFloating(true), 500);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative pt-20 pb-40 text-center bg-pink-200/50 overflow-hidden"
        style={{ 
            backgroundImage: `url('path/to/your/custom/hero-bg.jpg')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundColor: '#fbeff2' 
        }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
           [Image Placeholder: Decorative Leafy Background Overlay]
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg tracking-tight animate-fade-in-down">
            Happy Birthday, Sinuola!
          </h1>
          <p className="text-xl text-white/90 mt-2 font-light animate-fade-in-down" style={{animationDelay: '0.2s'}}>
            To the love of my life, my brightest star.
          </p>
          <a
            href="#letter"
            className={`mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-600 text-white text-sm font-medium shadow-xl transition duration-500 hover:bg-pink-500 ${floating ? 'animate-float' : ''}`}
            style={{animationDelay: '0.4s'}}
          >
            A special surprise for you 💖
          </a>
        </div>
      </section>

      {/* --- Main Content Area --- */}
      <main className="-mt-20 relative z-20 max-w-5xl mx-auto px-4 sm:px-6">

        {/* 1. The Letter Section - Uses AnimatedSection for fade-up on scroll */}
        <AnimatedSection 
          id="letter" 
          className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-pink-100 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Image Placeholder */}
            <div className="w-full md:w-56 h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg bg-pink-200">
                [Image Placeholder: Sinuola Portrait]
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-pink-700 mb-4">
                A Letter to My Love
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed space-y-3">
                <span className="font-semibold">My Dearest Sinuola,</span>
                <p>
                    I wanted to take a moment to tell you just how much you mean to me. Every day with you feels like a blessing, and I am so grateful for having you in my life. You bring so much joy, laughter, and light to the world.
                </p>
                <p>
                    Happy Birthday, my love. May your day be as wonderful as you are.
                </p>
                <p className="font-semibold mt-4">With all my love, [Your Name]</p>
              </p>
            </div>
          </div>
        </AnimatedSection>
        
        {/* 2. Favorite Moments Section - Uses AnimatedSection for fade-up on scroll */}
        <AnimatedSection id="moments" className="py-10">
          <h2 className="text-2xl font-bold text-center text-pink-700 mb-8">
            A Few of My Favorite Moments 📸
          </h2>

          {/* Staggered grid animation */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            <MomentTile caption="Our first trip together" delay={0} />
            <MomentTile caption="The most beautiful sound I know" delay={150} />
            <MomentTile caption="A quiet evening at home" delay={300} />
            <MomentTile caption="Celebrating your last birthday" delay={0} />
            <MomentTile caption="Spontaneous adventure day" delay={150} />
            <MomentTile caption="Just being us" delay={300} />
          </div>
        </AnimatedSection>

        {/* 3. Reasons Why I Love You Section - Uses AnimatedSection for fade-up on scroll */}
        <AnimatedSection id="reasons" className="py-10">
            <h2 className="text-2xl font-bold text-center text-pink-700 mb-8">
                A Few Reasons Why I Love You ❤️
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ReasonBubble 
                    title="Your Incredible Laugh" 
                    description="It is the sound that keeps brightening my entire day." 
                />
                <ReasonBubble 
                    title="The Way You Care" 
                    description="You look out for everyone and always think of others." 
                />
                <ReasonBubble 
                    title="Our First Coffee Date" 
                    description="Because that's where I knew you were someone truly special." 
                />
                <ReasonBubble 
                    title="Your Curious Mind" 
                    description="I love learning new things with you and sharing your perspective." 
                />
                <ReasonBubble 
                    title="How You Make Me Feel" 
                    description="Safe, cherished, and completely myself. Thank you." 
                />
                <ReasonBubble 
                    title="Simply, You" 
                    description="Everything about you, my lovely Sinuola. I love you endlessly." 
                />
            </div>
        </AnimatedSection>
        
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-gray-500 mt-12">
        <p>Made with 💖 for Sinuola</p>
      </footer>
    </div>
  );
}