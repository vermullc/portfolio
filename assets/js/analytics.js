const googleAnalyticsId = "G-7GGPXEKQPG";

const googleAnalyticsScript = document.createElement("script");
googleAnalyticsScript.async = true;
googleAnalyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
document.head.appendChild(googleAnalyticsScript);

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", googleAnalyticsId);