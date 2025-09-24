import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for combining class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme management utilities
export const themeUtils = {
  // Get saved theme from localStorage
  getSavedTheme: (): 'light' | 'dark' | 'system' | null => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || null;
    }
    return null;
  },

  // Save theme to localStorage
  saveTheme: (theme: 'light' | 'dark' | 'system') => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  },

  // Check if user prefers dark mode
  prefersColorScheme: (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  },

  // Apply theme to document
  applyTheme: (theme: 'light' | 'dark' | 'system') => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const actualTheme = theme === 'system' ? themeUtils.prefersColorScheme() : theme;
      root.setAttribute('data-theme', actualTheme);
    }
  },

  // Initialize theme on page load
  initializeTheme: () => {
    if (typeof window !== 'undefined') {
      const savedTheme = themeUtils.getSavedTheme();
      const systemTheme = themeUtils.prefersColorScheme();
      const initialTheme = savedTheme || 'system';
      
      themeUtils.applyTheme(initialTheme);
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (themeUtils.getSavedTheme() === 'system' || !themeUtils.getSavedTheme()) {
          themeUtils.applyTheme('system');
        }
      });
    }
  }
};

// Local storage utilities
export const storageUtils = {
  // Cookie management
  setCookie: (name: string, value: string, days: number = 365) => {
    if (typeof window !== 'undefined') {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
    }
  },

  getCookie: (name: string): string | null => {
    if (typeof window !== 'undefined') {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  },

  // Local storage with error handling
  setItem: (key: string, value: unknown) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  getItem: <T = unknown>(key: string): T | null => {
    try {
      if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
    }
    return null;
  },

  removeItem: (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }
};

// Animation utilities
export const animationUtils = {
  // Smooth scroll to element
  scrollToElement: (selector: string, offset: number = 80) => {
    if (typeof window !== 'undefined') {
      const element = document.querySelector(selector);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  },

  // Intersection Observer for animations
  createIntersectionObserver: (
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ) => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      return new IntersectionObserver(callback, {
        rootMargin: '0px',
        threshold: 0.1,
        ...options
      });
    }
    return null;
  }
};

// Form utilities
export const formUtils = {
  // Format currency for LKR
  formatLKR: (amount: number): string => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  },

  // Validate email
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Debounce function
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function
  throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Device detection utilities
export const deviceUtils = {
  // Check if device is mobile
  isMobile: (): boolean => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  },

  // Check if device is tablet
  isTablet: (): boolean => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 && window.innerWidth < 1024;
    }
    return false;
  },

  // Check if device is desktop
  isDesktop: (): boolean => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  },

  // Check if device supports touch
  isTouchDevice: (): boolean => {
    if (typeof window !== 'undefined') {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    return false;
  },

  // Get viewport dimensions
  getViewport: () => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
    return { width: 0, height: 0 };
  }
};

// Performance utilities
export const performanceUtils = {
  // Preload images
  preloadImages: (urls: string[]): Promise<void[]> => {
    return Promise.all(
      urls.map(url => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = url;
        });
      })
    );
  },

  // Lazy load images
  lazyLoadImage: (img: HTMLImageElement): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (img.complete && img.naturalHeight !== 0) {
        resolve();
        return;
      }
      
      img.onload = () => resolve();
      img.onerror = reject;
      
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  },

  // Request idle callback with fallback
  requestIdleCallback: (callback: () => void, timeout: number = 5000) => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout });
    } else {
      setTimeout(callback, 100);
    }
  }
};

// SEO utilities
export const seoUtils = {
  // Generate meta description from content
  generateMetaDescription: (content: string, maxLength: number = 160): string => {
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    return cleanContent.length > maxLength 
      ? cleanContent.substring(0, maxLength - 3) + '...'
      : cleanContent;
  },

  // Generate slug from title
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  // Update page title
  updatePageTitle: (title: string, siteName: string = 'Apilage AI') => {
    if (typeof document !== 'undefined') {
      document.title = `${title} | ${siteName}`;
    }
  },

  // Update meta description
  updateMetaDescription: (description: string) => {
    if (typeof document !== 'undefined') {
      const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDescription) {
        metaDescription.content = description;
      }
    }
  }
};

// Export all utilities as a single object
export const utils = {
  theme: themeUtils,
  storage: storageUtils,
  animation: animationUtils,
  form: formUtils,
  device: deviceUtils,
  performance: performanceUtils,
  seo: seoUtils
};

export default utils;
