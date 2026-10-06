import { useCallback, useEffect, useState } from "react";
import { Icon } from "./Icon";

type HeroSectionProps = {
  onShopClick: (category: string) => void;
};

type Slide = {
  name: string;
  caption: string;
  tagline: string;
  price: number;
  badge: string;
  category: string; // must match a category used in your products / navbar
  image: string;
  alt: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=90`;

// Edit names, taglines, prices, badges and categories here.
const slides: Slide[] = [
  {
    name: "Classic Red Air Max",
    caption: "Air Max Classic",
    tagline: "Iconic Air cushioning, bold colour",
    price: 150,
    badge: "Iconic",
    category: "Running",
    image: img("photo-1542291026-7eec264c27ff"),
    alt: "Classic Red Nike Air Max running shoes",
  },
  {
    name: "Air Jordan 1 Retro High",
    caption: "Air Jordan 1",
    tagline: "The original high-top legend",
    price: 180,
    badge: "Icon",
    category: "Basketball",
    image: img("photo-1552346154-21d32810aba3"),
    alt: "Nike Air Jordan 1 Retro High Sneaker",
  },
  {
    name: "Air Force 1 Low — Triple White",
    caption: "Air Force 1",
    tagline: "Clean, crisp, always in style",
    price: 115,
    badge: "Classic",
    category: "Lifestyle",
    image: img("photo-1595950653106-6c9ebd614d3a"),
    alt: "Triple White Nike Air Force 1 Low",
  },
  {
    name: "Dunk Low — Black & White",
    caption: "Dunk Low",
    tagline: "Court heritage meets street style",
    price: 125,
    badge: "Trending",
    category: "Lifestyle",
    image: img("photo-1600185365483-26d7a4cc7519"),
    alt: "Nike Dunk Low Retro Panda Edition",
  },
  {
    name: "Neon Performance Runner",
    caption: "Performance Run",
    tagline: "Lightweight speed in neon green",
    price: 140,
    badge: "New",
    category: "Running",
    image: img("photo-1606107557195-0e29a4b5b4aa"),
    alt: "Neon Green Nike Performance Running Shoe",
  },
  {
    name: "Blazer Mid '77 Vintage",
    caption: "Blazer Mid '77",
    tagline: "Retro high-top with vintage soul",
    price: 105,
    badge: "Vintage",
    category: "Lifestyle",
    image: img("photo-1582588678413-dbf45f4823e9"),
    alt: "Nike Blazer Mid 77 Vintage High-Top",
  },
  {
    name: "Air Zoom Athletic Shoe",
    caption: "Air Zoom",
    tagline: "Responsive Zoom Air for every stride",
    price: 130,
    badge: "Performance",
    category: "Running",
    image: img("photo-1579338559194-a162d19bf842"),
    alt: "Blue and Orange Nike Air Zoom Athletic Shoe",
  },
  {
    name: "Basketball Performance Sneaker",
    caption: "Court Performance",
    tagline: "Grip, support and bounce on court",
    price: 160,
    badge: "On Court",
    category: "Basketball",
    image: img("photo-1511556532299-8f662fc26c06"),
    alt: "Nike Basketball Performance Sneaker On Display",
  },
  {
    name: "Flyknit Lightweight Trainer",
    caption: "Flyknit Trainer",
    tagline: "Featherweight knit, locked-in fit",
    price: 150,
    badge: "Lightweight",
    category: "Training",
    image: img("photo-1539185441755-769473a23570"),
    alt: "White and Yellow Nike Flyknit Athletic Sneakers",
  },
  {
    name: "Nike Air Max 270",
    caption: "Air Max 270",
    tagline: "Unmatched Air cushioning",
    price: 160,
    badge: "Bestseller",
    category: "Lifestyle",
    image: img("photo-1634624943287-6e1f2d103201"),
    alt: "White and blue Nike Air Max 270",
  },
];

const AUTOPLAY_MS = 5000;
const pad = (n: number, len = 2) => String(n).padStart(len, "0");

export function HeroSection({ onShopClick }: HeroSectionProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slide = slides[index];

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length);
  }, []);

  // Auto-advance (resets whenever the slide changes, including manual clicks)
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion) return;

    const timer = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, goTo]);

  // Preload the next image so the swap feels instant
  useEffect(() => {
    const next = new Image();
    next.src = slides[(index + 1) % slides.length].image;
  }, [index]);

  return (
    <section className="hero">
      <div className="hero-copy">
        <div>
          <span className="eyebrow">Iconic Air · Engineered for now</span>
          <h1>
            STEP INTO
            <br />
            THE <em>FUTURE</em>
          </h1>
        </div>
        <div className="hero-details">
          <div key={`details-${index}`} className="hero-text-anim">
            <p>
              {slide.name} — {slide.tagline}
            </p>
            <strong>${slide.price}</strong>
          </div>
          <button className="primary-cta" onClick={() => onShopClick(slide.category)}>
            Shop Now <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>

      <div
        className="hero-visual"
        // Hovering no longer pauses the cycle. Only pause for keyboard focus,
        // so clicking an arrow or dot with the mouse doesn't stall the autoplay.
        onFocus={(e) => {
          if (e.target.matches(":focus-visible")) setPaused(true);
        }}
        onBlur={() => setPaused(false)}
      >
        <div key={`num-${index}`} className="hero-number hero-text-anim">
          {pad(index + 1)}
        </div>
        <span key={`badge-${index}`} className="bestseller hero-text-anim">
          {slide.badge}
        </span>
        <img key={slide.image} className="hero-slide-img" src={slide.image} alt={slide.alt} />

        <div className="hero-controls">
          <button
            className="hero-arrow hero-arrow-prev"
            aria-label="Previous product"
            onClick={() => goTo(index - 1)}
          >
            <Icon name="arrow" size={16} />
          </button>
          <button
            className="hero-arrow"
            aria-label="Next product"
            onClick={() => goTo(index + 1)}
          >
            <Icon name="arrow" size={16} />
          </button>
          <div className="hero-dots" role="tablist" aria-label="Featured products">
            {slides.map((s, i) => (
              <button
                key={s.image}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${s.name}`}
                className={`hero-dot${i === index ? " active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        <div className="hero-caption">
          <span key={`cap-${index}`} className="hero-text-anim">
            {slide.caption}
          </span>
          <span>
            {pad(index + 1, 3)} / {pad(slides.length, 3)}
          </span>
        </div>
      </div>
    </section>
  );
}