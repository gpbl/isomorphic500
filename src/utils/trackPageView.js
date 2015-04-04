// Track a pageview with Google Analytics
// (this code must run only on client!)

function trackPageView() {
  if (window.ga) {
    // Track the page view with google analytics
    window.ga("send", "pageview");
  }
}

export default trackPageView;
