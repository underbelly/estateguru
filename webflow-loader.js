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

// Function to remove unused CSS links based on environment
function toggleCSSLinks() {
  const productionLink = document.getElementById('estateguru-css') || 
                         document.querySelector('link[href*="production/style.css"]');
  const stagingLink = document.getElementById('estateguru-css-staging') || 
                      document.querySelector('link[href*="staging/style.css"]');
  
  if (isStaging) {
    // Staging mode: remove production CSS link
    if (productionLink) {
      productionLink.remove();
      console.log('🔵 Removed production CSS');
    }
    if (stagingLink) {
      console.log('🔵 Using staging CSS');
    }
  } else {
    // Production mode: remove staging CSS link
    if (stagingLink) {
      stagingLink.remove();
      console.log('🟢 Removed staging CSS');
    }
    if (productionLink) {
      console.log('🟢 Using production CSS');
    }
  }
}

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', toggleCSSLinks);
} else {
  toggleCSSLinks();
}

// Load JavaScript
const script = document.createElement('script');
script.src = scriptUrl;
script.type = 'module';
document.body.appendChild(script);
