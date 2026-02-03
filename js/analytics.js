// Analytics tracking
function trackPageView() {
    // Track page view
    const pageData = {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    // Save to Firestore
    if (typeof db !== 'undefined') {
        db.collection("page_views").add(pageData)
            .catch(error => console.error("Tracking error:", error));
    }
}

// Track visitor country
async function trackVisitorCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const visitorData = {
            country: data.country_name,
            city: data.city,
            ip: data.ip,
            timestamp: new Date().toISOString()
        };
        
        if (typeof db !== 'undefined') {
            db.collection("visitors").add(visitorData);
        }
        
    } catch (error) {
        console.error("Country tracking error:", error);
    }
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', function() {
    trackPageView();
    trackVisitorCountry();
});
