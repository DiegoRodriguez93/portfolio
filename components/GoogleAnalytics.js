import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GoogleAnalytics = () => {
  const router = useRouter();
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Solo cargar GA si hay measurement ID y estamos en producción
    if (!GA_MEASUREMENT_ID || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Cargar GA de forma lazy después de que la página esté completamente cargada
    const loadGA = () => {
      // Initialize gtag with consent mode
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      // Set default consent state - granted by default (non-EU site)
      gtag('consent', 'default', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
      });

      // Load Google Analytics script de forma async
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.onload = () => {
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
          page_title: document.title,
          page_location: window.location.href,
        });

        // Check if user has explicitly opted out
        const consent = localStorage.getItem('cookie-consent');
        if (consent === 'denied') {
          gtag('consent', 'update', {
            analytics_storage: 'denied',
          });
        }
      };
      
      document.head.appendChild(script);
    };

    // Cargar GA después de que todo esté listo
    if (document.readyState === 'complete') {
      // Delay adicional para no interferir con el LCP
      setTimeout(loadGA, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(loadGA, 1000);
      });
    }

    // Track page views on route change
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
          page_title: document.title,
          page_location: window.location.href,
        });
      }
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