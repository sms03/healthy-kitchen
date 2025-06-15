
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
    // Smooth page transition
    const tl = gsap.timeline();
    tl.fromTo(element,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.6, 
        ease: "power2.out"
      }
    );
    return tl;
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
    hoverScale,
    hoverReset,
    scrollTriggerAnimation
  };
};
