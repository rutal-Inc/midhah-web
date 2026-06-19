/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
  tailwindPreserveWhitespace: false,
  tailwindPreserveDuplicates: false,
  // Optional but recommended: Tell the plugin exactly where your Tailwind config is
  tailwindConfig: "./apps/web/tailwind.config.ts",
};
