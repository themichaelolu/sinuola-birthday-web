import React, { useEffect, useRef, useState } from "react";
// import real assets used in the moments grid
import dImg from './assets/d.jpg';
import ogunbVideo from './assets/ogunb6.MP4';
import ogunb1 from './assets/ogunb1.MOV';
import ogunb2 from './assets/ogunb2.MOV';
import ogunb3 from './assets/ogunb3.MOV';
import ogunb4 from './assets/ogunb4.MOV';
import ogunb5 from './assets/ogunb5.MOV';

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
const MomentTile = ({ caption, delay = 0, mediaType = null, mediaSrc = null }) => {
  const [aspectStr, setAspectStr] = useState(null);
  const videoRef = useRef(null);

  const onVideoMeta = (e) => {
    try {
      const v = e.currentTarget || videoRef.current;
      if (v && v.videoWidth && v.videoHeight) {
        setAspectStr(`${v.videoWidth}/${v.videoHeight}`);
      }
    } catch (err) {
      // ignore
    }
  };

  const containerStyle = { transitionDelay: `${delay}ms` };
  if (mediaType === 'video' && aspectStr) {
    containerStyle.aspectRatio = aspectStr;
  }

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md relative w-full bg-gray-100 transition-transform duration-700 hover:scale-[1.02] ${mediaType !== 'video' ? 'aspect-[4/3] sm:aspect-square' : ''}`}
      style={containerStyle}
    >
    {/* small in-tile confetti for extra density */}
    <div className="absolute" style={{ left: '6%', top: '6%' }}>
      <div className="confetti confetti--sm confetti--pink" style={{ animationDuration: '6.7s', animationDelay: '0.2s' }} />
      <div className="confetti confetti--sm confetti--rose wind" style={{ left: '18px', top: '8px', position: 'absolute', animationDuration: '7.6s', animationDelay: '0.6s' }} />
    </div>
    {/* Render provided media (image/video) or fallback placeholder */}
    {mediaType === 'image' && mediaSrc ? (
      <img src={mediaSrc} alt={caption} className="w-full h-full object-cover" />
    ) : mediaType === 'video' && mediaSrc ? (
      <video
        ref={videoRef}
        onLoadedMetadata={onVideoMeta}
        autoPlay
        muted
        playsInline
        loop
        controls
        className="w-full h-full object-cover"
      >
        <source src={mediaSrc} />
        Your browser does not support the video tag.
      </video>
    ) : (
      <div className="w-full h-full bg-gray-200/60 flex items-center justify-center text-gray-500 text-sm">
        <p className="font-light text-center">[Image Placeholder]</p>
      </div>
    )}

    {/* Caption overlay at the bottom */}
    {/* The design has a slightly blurred dark overlay for the text */}
    <div className="absolute inset-x-0 bottom-0 h-1/4 flex items-center justify-center p-2 bg-black/40">
      <p className="text-xs font-medium text-white text-center drop-shadow-md font-serif">
        {caption}
      </p>
    </div>
  </div>
  );
};

/* Small carousel for a few video clips — fits to active video's aspect ratio and autoplay muted */
const MediaCarousel = ({ sources = [], caption = '', delay = 0 }) => {
  const [index, setIndex] = useState(0);
  const [aspectStr, setAspectStr] = useState(null);
  const vidRef = useRef(null);

  useEffect(() => setAspectStr(null), [index]);

  const onVideoMeta = (e) => {
    try {
      const v = e.currentTarget || vidRef.current;
      if (v && v.videoWidth && v.videoHeight) {
        setAspectStr(`${v.videoWidth}/${v.videoHeight}`);
      }
    } catch (err) {}
  };

  const onEnded = () => setIndex((i) => (i + 1) % sources.length);

  const containerStyle = { transitionDelay: `${delay}ms` };
  if (aspectStr) containerStyle.aspectRatio = aspectStr;

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md relative w-full bg-gray-100 transition-transform duration-700 hover:scale-[1.02]`}
      style={containerStyle}
    >
      {sources.length ? (
        <div className="w-full h-full relative">
          <video
            ref={vidRef}
            onLoadedMetadata={onVideoMeta}
            onEnded={onEnded}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            src={sources[index]}
          />

          {/* autoplay-only carousel (no icons) — small indicator to show current slide */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2 opacity-80">
            {sources.map((s, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gray-200/60 flex items-center justify-center text-gray-500 text-sm">No media</div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-1/4 flex items-center justify-center p-2 bg-black/40">
        <p className="text-xs font-medium text-white text-center drop-shadow-md font-serif">{caption}</p>
      </div>
    </div>
  );
};

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
      className="relative w-full min-h-[48vh] sm:h-[70vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background image + dim overlay (absolutely positioned) */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(placeholder-hero-portrait.jpg)" }}
        />
      </div>

      {/* Foreground padded container with radius and subtle border */}
      <div className="relative z-10 w-full px-4">
        <div
          className="mx-auto max-w-xl bg-white/5 backdrop-blur-sm rounded-3xl p-5 sm:p-8 shadow-lg"
          style={{ border: `1px solid rgba(231,161,182,0.14)` }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-pink-500 tracking-tight leading-snug font-serif">
            Happy Birthday, My Princess
          </h1>
          <p className="text-sm sm:text-base text-pink-500 mt-2 font-serif ">
            A celebration of you and all the wonderful moments we've shared.
            Here's to another year of your incredible light.
          </p>
        </div>
      </div>
    </section>
  );

  /* Small presentational component: a compact confetti cluster for insertion inside sections */
  const ConfettiCluster = ({ positions = [] }) => (
    <div className="section-confetti" aria-hidden="true">
      {positions.map((p, idx) => (
        <div
          key={idx}
          className={`confetti confetti--${p.variant || 'pink'}`}
          style={{ left: p.left, top: p.top, animationDuration: p.duration || '6s', animationDelay: p.delay || '0s' }}
        />
      ))}
    </div>
  );

  const SectionEmojis = ({ items = [] }) => (
    <>
      {items.map((it, i) => (
        <span
          key={i}
          className={`section-emoji ${it.size || 'emoji-sm'}`}
          style={{ left: it.left, top: it.top, right: it.right, bottom: it.bottom, color: it.color }}
          aria-hidden="true"
        >
          {it.char}
        </span>
      ))}
    </>
  );

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: COLOR_MAIN_BG }}
    >
      {/* Decorative confetti + emojis that float across the page (page-level) */}
      <div aria-hidden="true" className="confetti-wrap">
        {/* Denser page-level confetti with more positions, sizes and wind movement */}
        {[
          { left: '2%', top: '-10vh', cls: 'confetti--sm confetti--pink wind', d: '7.2s', delay: '0.0s' },
          { left: '6%', top: '-12vh', cls: 'confetti--md confetti--rose', d: '6.0s', delay: '0.2s' },
          { left: '10%', top: '-14vh', cls: 'confetti--lg confetti--yellow wind', d: '9.2s', delay: '0.1s' },
          { left: '14%', top: '-8vh', cls: 'confetti--sm confetti--mint', d: '7.8s', delay: '0.3s' },
          { left: '20%', top: '-6vh', cls: 'confetti--md confetti--lavender wind', d: '8.6s', delay: '0.5s' },
          { left: '26%', top: '-16vh', cls: 'confetti--sm confetti--pink', d: '6.6s', delay: '0.6s' },
          { left: '32%', top: '-9vh', cls: 'confetti--md confetti--rose', d: '7.1s', delay: '0.7s' },
          { left: '40%', top: '-11vh', cls: 'confetti--lg confetti--yellow wind', d: '10.0s', delay: '0.2s' },
          { left: '48%', top: '-13vh', cls: 'confetti--md confetti--mint', d: '7.3s', delay: '0.4s' },
          { left: '56%', top: '-8vh', cls: 'confetti--sm confetti--lavender', d: '6.8s', delay: '0.5s' },
          { left: '64%', top: '-12vh', cls: 'confetti--lg confetti--pink wind', d: '9.4s', delay: '0.25s' },
          { left: '72%', top: '-9vh', cls: 'confetti--md confetti--rose', d: '8.1s', delay: '0.15s' },
          { left: '80%', top: '-13vh', cls: 'confetti--sm confetti--yellow wind', d: '7.5s', delay: '0.5s' },
          { left: '88%', top: '-7vh', cls: 'confetti--md confetti--mint', d: '7.0s', delay: '0.3s' },
          { left: '94%', top: '-12vh', cls: 'confetti--lg confetti--lavender wind', d: '8.9s', delay: '0.45s' },
        ].map((c, idx) => (
          <div
            key={idx}
            className={`confetti ${c.cls}`}
            style={{ left: c.left, top: c.top, animationDuration: c.d, animationDelay: c.delay }}
          />
        ))}

        {/* Extra decorative emojis placed across the page (different sizes and positions) */}
        <span className="decorative-emoji emoji-heart" style={{ left: '8px', bottom: '160px', fontSize: '26px' }}>💞</span>
        <span className="decorative-emoji emoji-rose" style={{ right: '12px', top: '110px', fontSize: '22px' }}>🌹</span>
        <span className="decorative-emoji emoji-heart" style={{ left: '20%', top: '28vh', fontSize: '30px' }}>💕</span>
        <span className="decorative-emoji emoji-rose" style={{ left: '6%', top: '16vh', fontSize: '22px' }}>🌹</span>
        <span className="decorative-emoji emoji-heart" style={{ right: '22%', bottom: '30vh', fontSize: '20px' }}>💗</span>
        <span className="decorative-emoji emoji-heart" style={{ left: '46%', bottom: '18vh', fontSize: '20px' }}>💖</span>
        <span className="decorative-emoji emoji-rose" style={{ right: '50px', bottom: '80px', fontSize: '18px' }}>🌹</span>
        <span className="decorative-emoji emoji-rose" style={{ left: '52%', top: '20vh', fontSize: '18px' }}>🌹</span>
      </div>

      {/* --- Small helper components used across sections --- */}
      {/* A small, light confetti cluster to drop inside sections without overwhelming them. */}
      {/* These components are small, purely presentational and respect reduced-motion. */}

      <HeroSection />

      {/* --- Main Content Area --- */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* 1. Our Cherished Memories Section */}
        <AnimatedSection id="moments" className="py-10 relative">
          <h2
            className="text-xl sm:text-2xl font-serif text-center mb-8 tracking-wider"
            style={{ color: COLOR_HEADING_PINK }}
          >
            Our Cherished Memories
          </h2>

          {/* Use a responsive CSS grid that makes each column equal width,
                enforces equal row heights and consistent gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr items-stretch relative">
            {/* Section-level confetti + emojis to make this area festive */}
            <ConfettiCluster positions={[
              { left: '4%', top: '-6%', variant: 'lavender', duration: '6.8s', delay: '0.2s' },
              { left: '16%', top: '-10%', variant: 'pink', duration: '7.5s', delay: '0.5s' },
              { left: '42%', top: '-8%', variant: 'mint', duration: '8.5s', delay: '0.3s' },
              { left: '58%', top: '-8%', variant: 'pink', duration: '8s', delay: '0.4s' },
              { left: '74%', top: '-12%', variant: 'yellow', duration: '7.4s', delay: '0.75s' },
            ]} />
            <SectionEmojis items={[{ char: '🌹', left: '6%', top: '6%', size: 'emoji-md', color: '#E7789D' }, { char: '💗', right: '6%', top: '10%', size: 'emoji-sm', color: '#ff9bbd' }, { char: '💞', left: '30%', top: '10%', size: 'emoji-sm', color: '#ff9bbd' }]} />
            <MomentTile caption="Our first date" delay={0} mediaType="image" mediaSrc={dImg} />
            <MediaCarousel caption="My favorite media of you" delay={300} sources={[ogunb2, ogunb3, ogunb4, ogunb5]} />
            <MediaCarousel caption="My favorite media of us" delay={900} sources={[ogunb1, ogunbVideo]} />
          </div>
        </AnimatedSection>
        {/* --- Divider --- */}
        <hr className="border-t border-pink-100 my-8" />
        {/* 2. The Letter Section */}
        <AnimatedSection id="letter" className="py-10 relative">
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
          {/* decorate the letter section with a few floating hearts */}
          <ConfettiCluster positions={[
            { left: '8%', top: '6%', variant: 'rose', duration: '6.2s', delay: '0.6s' },
            { left: '22%', top: '2%', variant: 'pink', duration: '7.0s', delay: '0.2s' },
            { left: '52%', top: '10%', variant: 'lavender', duration: '6.8s', delay: '0.4s' }
          ]} />
          <SectionEmojis items={[{ char: '💞', right: '6%', top: '2%', size: 'emoji-md', color: '#e7789d' }, { char: '🌹', left: '10%', bottom: '6%', size: 'emoji-sm', color: '#e7789d' }]} />
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
        <AnimatedSection id="reasons" className="py-10 relative">
          <h2
            className="text-xl sm:text-2xl font-serif text-center mb-8 tracking-wider"
            style={{ color: COLOR_HEADING_PINK }}
          >
            A Few Reasons I Love You
          </h2>

          {/* Using the new ReasonContainer component for each reason */}
          <div className="space-y-4 mx-auto max-w-2xl relative">
            <ConfettiCluster positions={[
              { left: '58%', top: '-8%', variant: 'mint', duration: '7.2s', delay: '0.2s' },
              { left: '70%', top: '-8%', variant: 'lavender', duration: '6.6s', delay: '0.4s' },
              { left: '86%', top: '-12%', variant: 'pink', duration: '8.0s', delay: '0.6s' }
            ]} />
            <SectionEmojis items={[{ char: '🌹', left: '4%', top: '-6%', size: 'emoji-sm', color: '#E7789D' }, { char: '💗', right: '6%', bottom: '6%', size: 'emoji-sm', color: '#ff9bbd' }]} />
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
