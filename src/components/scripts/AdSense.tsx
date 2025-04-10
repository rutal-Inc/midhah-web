import Script from "next/script";

function AdSense() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      strategy="beforeInteractive"
      async
      crossOrigin="anonymous"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9810490020982461"
    />
  );
}

export default AdSense;
