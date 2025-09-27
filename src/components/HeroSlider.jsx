import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
  
HeroSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      ctaText: PropTypes.string,
      ctaHref: PropTypes.string,
    })
  ),
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  heightClass: PropTypes.string,
  showArrows: PropTypes.bool,
  showDots: PropTypes.bool,
};

// TODO arreglar el como se ven las fotos en el slider

export default function HeroSlider({
  slides = [],                 // [{ src, alt, title, subtitle, ctaText, ctaHref }]
  autoPlay = true,
  interval = 5000,
  heightClass="aspect-video",
  showArrows = true,
  showDots = true,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const n = slides.length;

  useEffect(() => {
    if (!autoPlay || paused || n <= 1) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % n);
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, interval, n]);

  function prev() {
    setIndex(i => (i - 1 + n) % n);
  }
  
  
  function next() {
    setIndex(i => (i + 1) % n);
  }

  // touch handlers for swipe
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchStartX.current == null) return;
    const dx = (e.changedTouches[0].clientX - touchStartX.current);
    if (dx > 50) prev();
    else if (dx < -50) next();
    touchStartX.current = null;
  }

  if (n === 0) return null;

  return (
    <section
      className={`relative w-full ${heightClass} overflow-hidden`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
    >
      {/* Slides wrapper */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)`, width: `${n * 100}%` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="flex-none w-full h-full relative">
            <img
              src={s.src}
              alt={s.alt ?? `slide-${i}`}
              className="w-full h-full object-contain bg-white"
              draggable="false"
            />
            {/* Overlay for texts */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6 md:p-12">
              <div className="text-white max-w-2xl">
                {s.title && <h2 className="text-2xl md:text-4xl font-semibold">{s.title}</h2>}
                {s.subtitle && <p className="mt-2 text-sm md:text-lg opacity-90">{s.subtitle}</p>}
                {s.ctaText && (
                  <a
                    href={s.ctaHref || "#"}
                    className="inline-block mt-4 px-4 py-2 bg-white text-black rounded-md text-sm font-medium"
                  >
                    {s.ctaText}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && n > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
          >
            {/* Left chevron */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
          >
            {/* Right chevron */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && n > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
