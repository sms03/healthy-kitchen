
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      // Set default ease
      gsap.defaults({ ease: "power2.out", duration: 0.6 });
      initialized.current = true;
    }
  }, []);

  const fadeInUp = (element: string | Element, delay = 0) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay }
    );
  };

  const fadeInLeft = (element: string | Element, delay = 0) => {
    gsap.fromTo(element, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, delay }
    );
  };

  const fadeInRight = (element: string | Element, delay = 0) => {
    gsap.fromTo(element, 
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, delay }
    );
  };

  const scaleIn = (element: string | Element, delay = 0) => {
    gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, delay }
    );
  };

  const staggerAnimation = (elements: string, delay = 0.1) => {
    gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: delay,
        ease: "back.out(1.7)"
      }
    );
  };

  const pageTransition = (element: string | Element) => {
    // Create a smoother page transition
    const tl = gsap.timeline();
    tl.fromTo(element,
      { opacity: 0, y: 30, scale: 0.98 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8, 
        ease: "power3.out"
      }
    );
    return tl;
  };

  const cartItemAnimation = (element: string | Element, isAdding = true) => {
    if (isAdding) {
      // Subtle bounce animation when adding to cart
      gsap.fromTo(element,
        { scale: 1 },
        { 
          scale: 1.05,
          duration: 0.15,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        }
      );
    } else {
      // Smooth scale down when removing
      gsap.to(element, {
        scale: 0.95,
        opacity: 0.7,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(element, { scale: 1, opacity: 1 });
        }
      });
    }
  };

  const addToCartButtonAnimation = (element: string | Element) => {
    // Pulse animation for add to cart button
    gsap.fromTo(element,
      { scale: 1 },
      {
        scale: 1.08,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // Add a subtle glow effect
          gsap.to(element, {
            boxShadow: "0 0 20px rgba(251, 146, 60, 0.4)",
            duration: 0.3,
            yoyo: true,
            repeat: 1
          });
        }
      }
    );
  };

  const quantityUpdateAnimation = (element: string | Element) => {
    // Subtle animation for quantity updates
    gsap.fromTo(element,
      { scale: 1, color: "#9ca3af" },
      {
        scale: 1.2,
        color: "#ea580c",
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      }
    );
  };

  const hoverScale = (element: string | Element) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const hoverReset = (element: string | Element) => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const scrollTriggerAnimation = (element: string, options = {}) => {
    gsap.fromTo(element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...options
        }
      }
    );
  };

  return {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    staggerAnimation,
    pageTransition,
    cartItemAnimation,
    addToCartButtonAnimation,
    quantityUpdateAnimation,
    hoverScale,
    hoverReset,
    scrollTriggerAnimation
  };
};
