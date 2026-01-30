// Detect environment
const isStaging = window.location.hostname.includes('webflow.io') || 
                  window.location.hostname.includes('.webflow.');

// Base URLs
const githubBase = 'https://underbelly.github.io/estateguru';

// Determine URLs based on environment
let cssUrl, scriptUrl;

if (isStaging) {
  // Webflow staging/preview - use staging files
  cssUrl = `${githubBase}/staging/style.css`;
  scriptUrl = `${githubBase}/staging/app.bundle.js`;
  console.log('🔵 Staging mode detected');
  console.log('CSS:', cssUrl);
  console.log('JS:', scriptUrl);
} else {
  // Production - use production files
  cssUrl = `${githubBase}/production/style.css`;
  scriptUrl = `${githubBase}/production/app.bundle.js`;
  console.log('🟢 Production mode');
  console.log('CSS:', cssUrl);
  console.log('JS:', scriptUrl);
}

// Log what would happen if not in staging (for testing)
console.log('📊 Environment check:');
console.log('  - isStaging:', isStaging);
console.log('  - hostname:', window.location.hostname);
console.log('  - Would use production if not staging:', !isStaging);

if (isStaging) {
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
