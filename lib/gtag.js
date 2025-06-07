// Google Analytics helper functions
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track custom events for business metrics
export const trackContactForm = (service = null) => {
  event({
    action: 'contact_form_submit',
    category: 'engagement',
    label: service || 'general_inquiry',
  });
};

export const trackServiceInterest = (service) => {
  event({
    action: 'service_interest',
    category: 'business',
    label: service,
  });
};

export const trackBlogRead = (articleTitle) => {
  event({
    action: 'blog_read',
    category: 'content',
    label: articleTitle,
  });
};

export const trackProjectView = (projectName) => {
  event({
    action: 'project_view',
    category: 'portfolio',
    label: projectName,
  });
};