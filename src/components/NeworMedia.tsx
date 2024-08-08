"use client";

import { useEffect } from "react";

function NeworMedia() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//cdn.thisiswaldo.com/static/js/25508.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return <div id="waldo-tag-25596"></div>
}

export default NeworMedia;
