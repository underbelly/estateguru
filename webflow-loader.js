// Detect environment
const codeToggle = document.getElementById('code-toggle');
const isLocalDev = codeToggle && codeToggle.offsetParent !== null;
const isStaging = window.location.hostname.includes('webflow.io') || 
                  window.location.hostname.includes('.webflow.');

// Base URLs
const githubBase = 'https://underbelly.github.io/estateguru';
const localBase = 'http://127.0.0.1:5500';

// Determine URLs based on environment
let cssUrl, scriptUrl;

if (isLocalDev) {
  // Local development
  cssUrl = `${localBase}/staging/style.css`;
  scriptUrl = `${localBase}/staging/app.bundle.js`;
} else if (isStaging) {
  // Webflow staging/preview - use staging files
  cssUrl = `${githubBase}/staging/style.css`;
  scriptUrl = `${githubBase}/staging/app.bundle.js`;
} else {
  // Production - use production files
  cssUrl = `${githubBase}/production/style.css`;
  scriptUrl = `${githubBase}/production/app.bundle.js`;
}

// Handle CSS: Production loads normally via <link> tag in HTML
// In Webflow, add this in the <head>: 
// <link rel="stylesheet" href="https://underbelly.github.io/estateguru/production/style.css" id="estateguru-css">
//
// This script will replace it with staging CSS if in staging/preview mode
// If in production, the HTML link tag loads normally (no JS needed)

if (isStaging || isLocalDev) {
  // Function to replace CSS link
  function replaceCSS() {
    // Find the production CSS link (by ID or href)
    const cssLink = document.getElementById('estateguru-css') || 
                    document.querySelector('link[href*="production/style.css"]');
    
    if (cssLink) {
      // Replace with staging CSS
      cssLink.href = cssUrl;
    } else {
      // Fallback: create link if production link doesn't exist yet
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssUrl;
      link.id = 'estateguru-css';
      document.head.appendChild(link);
    }
  }
  
  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceCSS);
  } else {
    replaceCSS();
  }
}
// If production, do nothing - CSS loads normally from HTML <link> tag

// Load JavaScript
const script = document.createElement('script');
script.src = scriptUrl;
script.type = 'module';
document.body.appendChild(script);
