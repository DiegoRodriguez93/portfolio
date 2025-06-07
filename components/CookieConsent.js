import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsCookie, BsX, BsShield, BsGear, BsChevronDown, BsChevronUp } from 'react-icons/bs';

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
      name: 'Necessary',
      description: 'Essential for website functionality',
      required: true,
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Help us understand website usage',
      required: false,
    },
    {
      id: 'functional',
      name: 'Functional',
      description: 'Remember your preferences',
      required: false,
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Show relevant advertisements',
      required: false,
    },
  ];

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 xl:right-[170px] z-50 w-80 max-w-[calc(100vw-2rem)] xl:max-w-[calc(100vw-190px)]"
        >
          <div className="bg-primary/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BsCookie className="w-5 h-5 text-accent" />
                <h3 className="text-sm font-semibold text-white">Cookie Settings</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <BsX className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-xs text-white/70 mb-4 leading-relaxed">
                We use cookies to enhance your experience and analyze our traffic. 
                Choose your preferences below.
              </p>

              {/* Quick Actions */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-300 font-medium"
                >
                  Accept All
                </button>
              </div>

              {/* Settings Toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full p-2 text-xs text-accent hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <BsGear className="w-3 h-3" />
                  Customize Settings
                </span>
                {showDetails ? (
                  <BsChevronUp className="w-3 h-3" />
                ) : (
                  <BsChevronDown className="w-3 h-3" />
                )}
              </button>

              {/* Detailed Settings */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3"
                  >
                    <div className="space-y-3 p-3 bg-white/5 rounded-lg border border-white/10">
                      {cookieTypes.map((cookie) => (
                        <div key={cookie.id} className="flex items-start gap-3">
                          <div className="flex items-center h-4 mt-0.5">
                            <input
                              type="checkbox"
                              id={cookie.id}
                              checked={preferences[cookie.id]}
                              onChange={() => handlePreferenceChange(cookie.id)}
                              disabled={cookie.required}
                              className="w-3 h-3 text-accent bg-transparent border-white/30 rounded focus:ring-accent focus:ring-1 disabled:opacity-50"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <label
                              htmlFor={cookie.id}
                              className={`block text-xs font-medium mb-1 ${
                                cookie.required ? 'text-white/60' : 'text-white cursor-pointer'
                              }`}
                            >
                              {cookie.name}
                              {cookie.required && (
                                <span className="ml-1 text-[10px] text-accent">(Required)</span>
                              )}
                            </label>
                            <p className="text-[10px] text-white/50 leading-relaxed">
                              {cookie.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Save Preferences Button */}
                    <button
                      onClick={handleSavePreferences}
                      className="w-full mt-3 px-3 py-2 text-xs rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                    >
                      Save Preferences
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Privacy Policy Link */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  <BsShield className="w-3 h-3" />
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;