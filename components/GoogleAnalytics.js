import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GoogleAnalytics = () => {
  const router = useRouter();
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Only load GA if measurement ID is provided
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics measurement ID not found');
      return;
    }

    // Initialize gtag with consent mode
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Set default consent state
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      wait_for_update: 500,
    });

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      try {
        const preferences = JSON.parse(consent);
        if (preferences.analytics) {
          gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: preferences.marketing ? 'granted' : 'denied',
          });
        }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }

    // Track page views on route change
    const handleRouteChange = (url) => {
      gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, GA_MEASUREMENT_ID]);

  // Don't render anything
  return null;
};

export default GoogleAnalytics;