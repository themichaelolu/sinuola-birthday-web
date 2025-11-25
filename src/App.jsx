import React, { useState, useRef, useCallback } from "react";

/*
 * Optimized Sinuola Birthday Page Component
 * Optimization focuses on:
 * 1. Using a reusable file upload handler (DRY principle).
 * 2. Using useCallback for handler functions for potential performance gains.
 * 3. General style and readability.
*/

// Component for a single upload file input
const FileInput = React.forwardRef(({ accept, onChange, multiple = true }, ref) => (
  <input
    ref={ref}
    type="file"
    accept={accept}
    multiple={multiple}
    className="hidden"
    onChange={onChange}
  />
));

// Component for a button that triggers a hidden file input
const UploadButton = ({ onClick, children, className }) => (
    <button
        onClick={onClick}
        className={className}
    >
        {children}
    </button>
);


export default function SinuolaBirthdayPage() {
  const [photos, setPhotos] = useState([
    // Keep the example image here, but ideally, this path should be a public URL or imported static asset
    "/mnt/data/a248f160-a801-479d-86f8-cdd794a8624d.png",
  ]);
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // OPTIMIZATION: Reusable handler for both photo and video uploads
  const createUploadHandler = (setFiles) => (e) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((file) => URL.createObjectURL(file));
    // Prepends new files to the list
    setFiles((prev) => [...urls, ...prev]); 
  };

  const handlePhotoUpload = useCallback(createUploadHandler(setPhotos), []);
  const handleVideoUpload = useCallback(createUploadHandler(setVideos), []);

  const handleSendMessage = useCallback(() => {
    if (!message.trim()) return;
    setMessages((prev) => [
      { id: Date.now(), text: message.trim() },
      ...prev,
    ]);
    setMessage("");
  }, [message]);
  
  const NavLink = ({ href, children }) => (
    <a href={href} className="px-3 py-1 rounded-full hover:bg-pink-100">
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-white text-gray-900">
      {/* Top bar */}
      <header className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-pink-200 flex items-center justify-center shadow-md">
            <span className="text-xl">🎂</span> {/* Added an emoji for the avatar */}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-pink-500">
              Happy Birthday
            </p>
            <h1 className="text-xl font-bold tracking-tight">
              For Sinuola Macaulay
            </h1>
          </div>
        </div>
        <nav className="hidden sm:flex gap-3 text-sm">
          <NavLink href="#hero">Home</NavLink>
          <NavLink href="#gallery">Photos</NavLink>
          <NavLink href="#videos">Videos</NavLink>
          <NavLink href="#notes">Love Notes</NavLink>
        </nav>
      </header>

      <hr className="my-6 border-pink-100 max-w-6xl mx-auto" />

      {/* Hero section */}
      <section
        id="hero"
        className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="flex-1 space-y-5">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-500">
            To My Love
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-pink-700">
            Happy Birthday, <span className="text-rose-500">Sinuola</span> 💖
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-xl">
            You are the love of my life, my favorite person, and the most
            beautiful soul I know. This little pink, flower-filled world is all
            for you — a place for our memories, your smile, and all the love I
            have for you.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#gallery"
              className="px-6 py-3 rounded-full bg-pink-600 text-white text-sm font-medium shadow-md hover:bg-pink-500"
            >
              View Our Memories
            </a>
            {/* Replaced with optimized UploadButton component */}
            <UploadButton
              onClick={() => photoInputRef.current?.click()}
              className="px-6 py-3 rounded-full border border-pink-300 bg-white text-pink-600 text-sm font-medium hover:bg-pink-50"
            >
              Add Cute Photos 📸
            </UploadButton>
            {/* Replaced with optimized FileInput component */}
            <FileInput
              ref={photoInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </div>
          <p className="text-xs text-gray-500">
            P.S. I adore you more than words will ever say. 🌹
          </p>
        </div>

        {/* Hero card - No optimization needed here, as it's purely structural JSX */}
        <div className="flex-1 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-pink-100 bg-white/80 backdrop-blur-sm">
            <img
              src="/mnt/data/a248f160-a801-479d-86f8-cdd794a8624d.png"
              alt="Sinuola themed"
              className="w-full h-80 object-cover"
            />
            <div className="p-4 sm:p-5 bg-gradient-to-t from-white/90 via-white/40 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-pink-500">
                    You & Me
                  </p>
                  <p className="text-sm font-semibold">
                    Forever my favorite person ❤️
                  </p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>Rated 5/5</p>
                  <p>by my heart 🌟</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating cute decorations */}
          <div className="absolute -top-4 -right-2 w-20 h-20 bg-pink-200/60 rounded-full blur-2xl" />
          <div className="absolute -bottom-6 -left-8 w-32 h-32 bg-rose-200/60 rounded-full blur-3xl" />
          <div className="absolute -bottom-4 right-0 text-3xl"></div>
        </div>
      </section>

      <hr className="my-6 border-pink-100 max-w-6xl mx-auto" />

      {/* Photo gallery */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-3xl font-bold text-pink-700">Photo Garden 🏞️</h3>
            <p className="text-sm text-gray-600">
              All the cute, pink, beautiful little moments with you. 
            </p>
          </div>
          {/* Replaced with optimized UploadButton component */}
          <UploadButton
            onClick={() => photoInputRef.current?.click()}
            className="px-4 py-2 text-xs sm:text-sm rounded-full border border-pink-300 bg-white text-pink-600 hover:bg-pink-50"
          >
            + Add More Pictures
          </UploadButton>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((src, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden shadow-sm group"
            >
              <img
                src={src}
                alt={`memory-${idx}`}
                className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 text-xs text-white drop-shadow">
                with Sinuola
              </div>
            </div>
          ))}

          {/* Upload tile - Keeping inline for simple styling */}
          <label className="flex items-center justify-center border-2 border-dashed border-pink-200 rounded-2xl p-4 cursor-pointer hover:bg-pink-50/60 transition">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 mb-2">
                <span className="text-xl">✨</span> {/* Added a placeholder emoji */}
              </div>
              <p className="text-xs text-pink-600">Tap to add more</p>
              {/* Reused FileInput logic */}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotoUpload} // uses the memoized handler
              />
            </div>
          </label>
        </div>
      </section>

      <hr className="my-6 border-pink-100 max-w-6xl mx-auto" />

      {/* Videos section */}
      <section
        id="videos"
        className="max-w-6xl mx-auto px-6 py-10 bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm"
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-2xl font-bold text-pink-700">
              Little Movies of Us 🎬
            </h3>
            <p className="text-sm text-gray-600">
              Save your favorite videos, voice notes, or birthday messages here
            </p>
          </div>
          {/* Replaced with optimized UploadButton component */}
          <UploadButton
            onClick={() => videoInputRef.current?.click()}
            className="px-5 py-2 rounded-full bg-pink-600 text-white text-xs sm:text-sm font-medium hover:bg-pink-500"
          >
            Upload Video
          </UploadButton>
          {/* Replaced with optimized FileInput component */}
          <FileInput
            ref={videoInputRef}
            accept="video/*"
            onChange={handleVideoUpload} // uses the memoized handler
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {videos.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10 text-sm">
              No videos yet — record a cute birthday message for Sinuola or add
              a clip of your favorite memory together 📽️
            </div>
          )}

          {videos.map((src, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden shadow-md">
              <video controls className="w-full h-48 object-cover">
                <source src={src} />
                Your browser does not support the video tag.
              </video>
              <div className="px-3 py-2 text-xs text-gray-600 bg-pink-50">
                A little moment with you ✨
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-6 border-pink-100 max-w-6xl mx-auto" />

      {/* Love Notes / Messages */}
      <section id="notes" className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-3xl font-bold text-pink-700">Love Notes to You 💌</h3>
        <p className="text-sm text-gray-600 mt-1">
          Write how you feel, a wish for her, or a tiny poem — everything for
          Sinuola stays right here.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Write note */}
          <div className="md:col-span-2 bg-pink-50 rounded-3xl p-5 border border-pink-100">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Dear Sinuola, today I want you to know that..."
              className="w-full h-40 rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <div className="mt-3 flex gap-3">
              <UploadButton
                onClick={handleSendMessage}
                className="px-5 py-2 rounded-full bg-pink-600 text-white text-sm font-medium hover:bg-pink-500"
              >
                Save Love Note
              </UploadButton>
              <UploadButton
                onClick={() => setMessage("")}
                className="px-5 py-2 rounded-full border border-pink-200 bg-white text-sm text-pink-600 hover:bg-pink-50"
              >
                Clear
              </UploadButton>
            </div>
          </div>

          {/* Recent notes */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-pink-100">
            <h4 className="font-semibold text-pink-700 text-sm">
              Recent Notes 📜
            </h4>
            <div className="mt-3 max-h-64 overflow-y-auto space-y-3">
              {messages.length === 0 ? (
                <p className="text-xs text-gray-500">
                  No notes yet — start by writing one from your heart. 💖
                </p>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-2xl bg-pink-50 text-xs text-gray-700"
                  >
                    <p>{m.text}</p>
                    {/* OPTIMIZATION: Display date in a friendly format */}
                    <p className="mt-1 text-[10px] text-gray-400">
                      {new Date(m.id).toLocaleDateString()} at{" "}
                      {new Date(m.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <hr className="my-6 border-pink-100 max-w-6xl mx-auto" />

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 text-center text-xs text-gray-500">
        <p>
          Made with endless love for{" "}
          <span className="text-pink-500 font-semibold">Sinuola Macaulay</span>.
        </p>
        <p className="mt-1">
          This page is our little universe — pink, soft, and just for you. 🌹
        </p>
        <p className="mt-3 text-[10px] text-gray-400">
          (Uploads stay in this browser session unless you connect your own
          storage.)
        </p>
      </footer>
    </div>
  );
}