import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * whenever the route changes. This improves user experience by ensuring
 * users start at the top of each new page.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the very top of the page when the pathname changes
    window.scrollTo(0, 0);
    
    // Alternative approach for better browser compatibility
    // document.documentElement.scrollTop = 0;
    // document.body.scrollTop = 0;
  }, [pathname]); // Re-run effect whenever the pathname changes

  // This component doesn't render anything visible
  return null;
}