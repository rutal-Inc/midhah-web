import Script from "next/script";

function NeworMedia() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      strategy="beforeInteractive"
      src="//cdn.thisiswaldo.com/static/js/25508.js"
    />
  );
}

export default NeworMedia;
