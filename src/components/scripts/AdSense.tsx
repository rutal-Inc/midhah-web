import Script from "next/script";

function AdSense() {
  return (
    <Script
      async
      crossOrigin="anonymous"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9810490020982461"
      strategy="afterInteractive"
    />
  );
}

export default AdSense;
