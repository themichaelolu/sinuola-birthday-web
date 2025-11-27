import React, { useEffect, useRef, useState } from "react";

/*
 * Dynamic version with Scroll-Reveal Animations,
 * styled to match the provided image design.
 */

// --- Design Palette (Based on the Image) ---
const COLOR_MAIN_BG = "#FFF8FA"; // Very light pink/near-white
const COLOR_HEADING_PINK = "#A05273"; // Muted dark pink for section titles
const COLOR_HEART = "#E7789D"; // Accent pink for icons/dividers
const COLOR_BUTTON_PINK = "#E7A1B6"; // Soft pink for the button
const COLOR_TEXT_DARK = "#3F3F46"; // Neutral dark gray for prose
const COLOR_REASON_BG = "#FFFFFF"; // Background for individual reason containers
const COLOR_REASON_BORDER = "#F0D9E4"; // Border for individual reason containers

// --- Helper Component: Animated Section (Observes Scroll) ---
const AnimatedSection = ({
  children,
  className,
  // Removed unused 'animationClass' prop for cleanliness
}) => {
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
        rootMargin: "0px",
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

// --- Reusable Component Helpers ---

// Component for a photo moment tile
const MomentTile = ({ caption, delay = 0 }) => (
  <div
    className={`rounded-xl overflow-hidden shadow-md relative w-full aspect-[4/3] sm:aspect-square bg-gray-100 transition-transform duration-700 hover:scale-[1.02]`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {/* Placeholder box for the image, styled to match the dimensions in the design */}
    <div className="w-full h-full bg-gray-200/60 flex items-center justify-center text-gray-500 text-sm">
      <p className="font-light text-center">[Image Placeholder]</p>
    </div>

    {/* Caption overlay at the bottom */}
    {/* The design has a slightly blurred dark overlay for the text */}
    <div className="absolute inset-x-0 bottom-0 h-1/4 flex items-center justify-center p-2 bg-black/40">
      <p className="text-xs font-medium text-white text-center drop-shadow-md font-serif">
        {caption}
      </p>
    </div>
  </div>
);

// New Component: Individual Reason Container for "Reasons Why I Love You"
const ReasonContainer = ({ text }) => (
  <div
    className="flex items-center p-4 rounded-lg shadow-sm"
    style={{
      backgroundColor: COLOR_REASON_BG,
      border: `1px solid ${COLOR_REASON_BORDER}`,
    }}
  >
    <span className="text-lg mr-3 flex-shrink-0" style={{ color: COLOR_HEART }}>
      ⭐
    </span>
    <p
      className="text-sm font-medium leading-tight"
      style={{ color: COLOR_TEXT_DARK, fontFamily: "Georgia, serif" }}
    >
      {text}
    </p>
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

  // --- Hero Section Component ---
  const HeroSection = () => (
    <section
      id="hero"
      className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image Placeholder (The woman's portrait) */}
      <div className="absolute inset-0 z-0">
        {/* Replace this div with your actual image component */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(placeholder-hero-portrait.jpg)" }}
        >
          {/* Dark Overlay with subtle transparency */}
          <div className="absolute inset-0 bg-black/50 backdrop-brightness-50 flex items-center justify-center p-4">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight leading-snug font-serif">
                Happy Birthday, My Princess
              </h1>
              <p className="text-sm sm:text-base text-white/90 mt-2 font-serif ">
                A celebration of you and all the wonderful moments we've shared.
                Here's to another year of your incredible light.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: COLOR_MAIN_BG }}
    >
      <HeroSection />

      {/* --- Main Content Area --- */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10">
        /* 1. Our Cherished Memories Section */
        <AnimatedSection id="moments" className="py-10">
          <h2
            className="text-xl sm:text-2xl font-serif text-center mb-8 tracking-wider"
            style={{ color: COLOR_HEADING_PINK }}
          >
            Our Cherished Memories
          </h2>

          {/* Use a responsive CSS grid that makes each column equal width,
                enforces equal row heights and consistent gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr items-stretch">
            <MomentTile caption="Our first date" delay={0} />
            <MomentTile caption="My favorite media of you" delay={300} />
          </div>
        </AnimatedSection>
        {/* --- Divider --- */}
        <hr className="border-t border-pink-100 my-8" />
        {/* 2. The Letter Section */}
        <AnimatedSection id="letter" className="py-10">
          <h2
            className="text-xl sm:text-2xl font-serif text-center mb-10 tracking-wider"
            style={{ color: COLOR_HEADING_PINK }}
          >
            My Letter to You, My Princess
          </h2>

          {/* Letter Container matching the rounded white box in the design */}
          <div
            className="bg-white rounded-xl p-6 sm:p-8 shadow-md mx-auto max-w-2xl"
            style={{ border: `1px solid ${COLOR_BUTTON_PINK}` }}
          >
            <p
              className="text-sm leading-relaxed text-center font-serif"
              style={{ color: COLOR_TEXT_DARK }}
            >
              {/* Keeping the message EXACTLY as requested */}
              My princess, on this special day I am celebrating the woman whose
              sweetness genuinely softens me, who beauty inside and out bursts
              my head every time. You always smell like peace & softness, like
              something worth holding close. You brighten my life just being in
              it. like I said some days ago you are the highlight of my year and
              I genuinely mean it. May God fill this year with peace that lasts
              forever, joy that grows and blessing that will always locate you
              easily. May every silent prayer in your heart be answered gently,
              may grace cover you and may your smile never fade
            </p>
          </div>
          <div
            className="text-center mt-4 text-2xl"
            style={{ color: COLOR_HEART }}
          >
            💖
          </div>
        </AnimatedSection>
        {/* --- Divider --- */}
        <hr className="border-t border-pink-100 my-8" />
        {/* 3. Reasons Why I Love You Section */}
        <AnimatedSection id="reasons" className="py-10">
          <h2
            className="text-xl sm:text-2xl font-serif text-center mb-8 tracking-wider"
            style={{ color: COLOR_HEADING_PINK }}
          >
            A Few Reasons I Love You
          </h2>

          {/* Using the new ReasonContainer component for each reason */}
          <div className="space-y-4 mx-auto max-w-2xl">
            <ReasonContainer text="Your very cute laugh that brightens up my day." />
            <ReasonContainer text="The way you care so deeply for the people in your life." />
            <ReasonContainer text="Your incredible sense of style and how you always look so elegant!" />
            <ReasonContainer text="Your passion for all things cute, especially roses and dresses." />
          </div>

          <div
            className="text-center mt-10 text-xs font-serif"
            style={{ color: COLOR_TEXT_DARK }}
          >
            With all my love, forever and always. <br />
            <span className="font-semibold text-sm font-serif">Your Love</span>
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
    </div>
  );
}
