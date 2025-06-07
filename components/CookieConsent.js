import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsCookie, BsX, BsShield, BsGear } from 'react-icons/bs';

const CookieConsent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
        // Initialize analytics based on saved preferences
        if (savedPreferences.analytics) {
          initializeAnalytics();
        }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const initializeAnalytics = () => {
    // Re-initialize Google Analytics if user accepts
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Initialize analytics
    initializeAnalytics();
    
    setShowModal(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    
    setPreferences(onlyNecessary);
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Disable analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
    
    setShowModal(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Update analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
      });
    }
    
    if (preferences.analytics) {
      initializeAnalytics();
    }
    
    setShowModal(false);
  };

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return; // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      description: 'Essential for the website to function properly. These cannot be disabled.',
      required: true,
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting anonymous information.',
      required: false,
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization, such as remembering your preferences.',
      required: false,
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant advertisements.',
      required: false,
    },
  ];

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-primary/95 backdrop-blur-md border border-white/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <BsCookie className="w-6 h-6 text-accent" />
                <h2 className="text-xl font-bold text-white">Cookie Preferences</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <BsX className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-white/80 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, 
                  and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>

              {/* Cookie Details Toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 mb-4 text-accent hover:text-white transition-colors duration-300"
              >
                <BsGear className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {showDetails ? 'Hide Details' : 'Customize Settings'}
                </span>
              </button>

              {/* Detailed Cookie Settings */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mb-6"
                  >
                    <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
                      {cookieTypes.map((cookie) => (
                        <div key={cookie.id} className="flex items-start gap-4">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              id={cookie.id}
                              checked={preferences[cookie.id]}
                              onChange={() => handlePreferenceChange(cookie.id)}
                              disabled={cookie.required}
                              className="w-4 h-4 text-accent bg-transparent border-white/30 rounded focus:ring-accent focus:ring-2 disabled:opacity-50"
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor={cookie.id}
                              className={`block text-sm font-medium mb-1 ${
                                cookie.required ? 'text-white/60' : 'text-white cursor-pointer'
                              }`}
                            >
                              {cookie.name}
                              {cookie.required && (
                                <span className="ml-2 text-xs text-accent">(Required)</span>
                              )}
                            </label>
                            <p className="text-xs text-white/60 leading-relaxed">
                              {cookie.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Privacy Policy Link */}
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <BsShield className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-white/80 mb-2">
                      Your privacy is important to us. Learn more about how we handle your data.
                    </p>
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors duration-300"
                    >
                      Read our Privacy Policy
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-6 py-3 rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  Reject All
                </button>
                
                {showDetails && (
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    Save Preferences
                  </button>
                )}
                
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-300 font-medium"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;