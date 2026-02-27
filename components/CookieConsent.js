import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsX } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const CookieConsent = () => {
  const { t } = useTranslation('common');
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) return;

    fetch('/api/geo-consent')
      .then((r) => r.json())
      .then((data) => {
        if (data.required) {
          const timer = setTimeout(() => setShowBanner(true), 1000);
          return () => clearTimeout(timer);
        }
      })
      .catch(() => {
        // If geo check fails, default to not showing to avoid annoying everyone
      });
  }, []);

  const saveConsent = (value) => {
    localStorage.setItem('cookie-consent', value);
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);

    if (value === 'denied' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 hidden sm:block"
          role="banner"
          aria-label={t('cookie.title')}
        >
          <div className="max-w-4xl mx-auto bg-primary/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl px-5 py-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <p className="text-xs text-white/80 flex-1 text-center sm:text-left">
              {t('cookie.message')}{' '}
              <Link
                href="/privacy-policy"
                className="text-accent hover:underline"
              >
                {t('cookie.privacyPolicy')}
              </Link>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => saveConsent('denied')}
                className="px-3 py-1.5 text-xs rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                {t('cookie.optOut')}
              </button>
              <button
                onClick={() => saveConsent('granted')}
                className="px-4 py-1.5 text-xs rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-300 font-medium"
                style={{ backgroundColor: '#F13024' }}
              >
                {t('cookie.ok')}
              </button>
              <button
                onClick={() => saveConsent('granted')}
                className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Close"
              >
                <BsX className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
