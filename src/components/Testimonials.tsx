"use client";

import { useRef, useEffect, useState } from "react";
import { Testimonial } from "../types/shared";
import {
  avatarGradients,
  row1Testimonials,
  row2Testimonials,
} from "../constants/clientTestimonials";

// Star Rating Component
const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < count ? "text-amber-400" : "text-slate-200"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Testimonial Card
const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => (
  <div className="testimonial-card flex-shrink-0 w-[320px] sm:w-[380px] rounded-2xl border border-white/50 bg-white/50 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:bg-white/70 hover:border-light-bronze/30 hover:-translate-y-1">
    {/* Avatar + Name + Role */}
    <div className="flex items-center gap-4">
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]} text-sm font-bold text-white shadow-md`}
      >
        {testimonial.avatar}
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-slate-900 truncate">
          {testimonial.name}
        </h4>
        <p className="text-xs text-slate-500 truncate">{testimonial.role}</p>
      </div>
    </div>

    {/* Rating */}
    <div className="mt-4">
      <StarRating count={testimonial.rating} />
    </div>

    {/* Review */}
    <p className="mt-3 text-sm leading-relaxed text-slate-600">
      &ldquo;{testimonial.text}&rdquo;
    </p>
  </div>
);

// Marquee Row with requestAnimationFrame
const SPEED = 0.5; // pixels per frame at ~60fps
const SLOW_FACTOR = 0.5;
const LERP_FACTOR = 0.04; // smooth interpolation for speed transitions

const MarqueeRow = ({
  testimonials,
  direction,
}: {
  testimonials: Testimonial[];
  direction: "left" | "right";
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const currentSpeedRef = useRef(SPEED);
  const targetSpeedRef = useRef(SPEED);
  const rafRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  // Update target speed when hover state changes
  useEffect(() => {
    targetSpeedRef.current = isHovered ? SPEED * SLOW_FACTOR : SPEED;
  }, [isHovered]);

  const animateRef = useRef<() => void>(() => {});

  useEffect(() => {
    animateRef.current = () => {
      const track = trackRef.current;
      if (!track) return;

      // Smoothly lerp current speed toward target speed
      currentSpeedRef.current +=
        (targetSpeedRef.current - currentSpeedRef.current) * LERP_FACTOR;

      const speed = currentSpeedRef.current;
      const sign = direction === "left" ? -1 : 1;
      offsetRef.current += speed * sign;

      // Get half the track width (one full set of cards)
      const halfWidth = track.scrollWidth / 2;

      // Wrap around seamlessly
      if (direction === "left" && offsetRef.current <= -halfWidth) {
        offsetRef.current += halfWidth;
      } else if (direction === "right" && offsetRef.current >= 0) {
        offsetRef.current -= halfWidth;
      }

      track.style.transform = `translateX(${offsetRef.current}px)`;

      // Recursively call the ref function safely
      rafRef.current = requestAnimationFrame(animateRef.current);
    };
  }, [direction]);

  // Start and stop the loop
  useEffect(() => {
    const track = trackRef.current;
    if (direction === "right" && track) {
      // Initialize offset for right-to-left rows
      offsetRef.current = -(track.scrollWidth / 2);
    }

    // Trigger the initial frame
    rafRef.current = requestAnimationFrame(animateRef.current);

    return () => cancelAnimationFrame(rafRef.current);
  }, [direction]);

  // Duplicate cards for seamless looping
  const cards = [...testimonials, ...testimonials];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-cornsilk to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-cornsilk to-transparent" />

      <div
        ref={trackRef}
        className="flex gap-6 py-3 will-change-transform"
        style={{ width: "max-content" }}
      >
        {cards.map((testimonial, i) => (
          <TestimonialCard
            key={`${testimonial.name}-${i}`}
            testimonial={testimonial}
            index={i % testimonials.length}
          />
        ))}
      </div>
    </div>
  );
};

// Main Testimonials Section
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-10 py-20 sm:py-24 overflow-hidden"
    >
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 text-center mb-14">
        <h2 className="text-xs font-bold uppercase tracking-widest text-light-bronze">
          Client Testimonials
        </h2>
        <p className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Loved by Professionals Worldwide
        </p>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Thousands of job seekers trust CVForbes to craft high-impact
          applications. Here&apos;s what they have to say.
        </p>
      </div>

      {/* Marquee Rows */}
      <div className="flex flex-col gap-6">
        {/* Row 1: Scrolls Left to Right */}
        <MarqueeRow testimonials={row1Testimonials} direction="right" />

        {/* Row 2: Scrolls Right to Left */}
        <MarqueeRow testimonials={row2Testimonials} direction="left" />
      </div>
    </section>
  );
}
