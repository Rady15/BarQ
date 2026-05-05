import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that replicates WOW.js exactly.
 * Elements with className "wow" + animation name (e.g. "wow fadeInUp")
 * and data-wow-delay attribute will be animated when scrolled into view.
 * 
 * This is called once per page component after mount.
 */
export function useWow() {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-wow-delay') || '0s';
          const duration = el.getAttribute('data-wow-duration') || '1s';
          const iteration = el.getAttribute('data-wow-iteration') || '1';
          
          el.style.visibility = 'visible';
          el.style.animationDelay = delay;
          el.style.animationDuration = duration;
          el.style.animationIterationCount = iteration;
          el.classList.add('animated');
          
          // Once animated, we can stop observing if we don't want exit transitions
          // But user asked for enter/outer, so we keep observing
        } else {
          const el = entry.target;
          el.classList.remove('animated');
          el.style.visibility = 'hidden';
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    const initWow = () => {
      const wowElements = document.querySelectorAll('.wow');
      wowElements.forEach((el) => {
        el.style.visibility = 'hidden'; // Ensure hidden
        observer.observe(el);
      });
    };

    // Run after a short delay to ensure DOM is ready
    const timer = setTimeout(initWow, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);
}

/**
 * Custom hook for sticky navbar behavior on scroll.
 */
export function useStickyNavbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 45);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isSticky;
}

/**
 * Custom hook for back-to-top button visibility and smooth scroll.
 */
export function useBackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    // Smooth easeInOutExpo-like scroll
    const start = window.scrollY;
    const duration = 1500;
    const startTime = performance.now();

    const easeInOutExpo = (t) => {
      if (t === 0) return 0;
      if (t === 1) return 1;
      if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2;
      return (2 - Math.pow(2, -20 * t + 10)) / 2;
    };

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutExpo(progress);
      
      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return { visible, scrollToTop };
}

/**
 * Custom hook for spinner (loading) behavior.
 */
export function useSpinner() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return loading;
}
