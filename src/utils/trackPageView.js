// Track a pageview with Google Analytics
// (this code must run only on client!)

function trackPageView(path) {
  if (!window.ga) {
    return;
  }

  window.ga("send", "pageview", path);
}

export default trackPageView;
