// Track a pageview with Google Analytics
// (this code must run only on client!)

function trackPageView() {
  if (!window.ga) {
    return;
  }

  window.ga("send", "pageview");
}

export default trackPageView;
