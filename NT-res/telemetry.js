(function () {
  const telemetryUrl = 'https://api.mj46.in/api/v1/telemetry/';
  
  const payload = JSON.stringify({
    path: window.location.pathname
  });

  // Use sendBeacon if supported for non-blocking analytics delivery, with fetch fallback
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    navigator.sendBeacon(telemetryUrl, blob);
  } else {
    fetch(telemetryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload,
      keepalive: true
    }).catch(function (error) {
      console.error('Telemetry ping failed:', error);
    });
  }
})();