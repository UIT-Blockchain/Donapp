/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const intercept = require("intercept-stdout");
const path = require("path");

const nextConfig = nextTranslate({
  swcMinify: true,
  reactStrictMode: true,
  publicRuntimeConfig: {
    TEAM_NAME: process.env.TEAM_NAME || "UNKNOWN",
    IS_DEV: process.env.NODE_ENV !== "production",
  },
  experimental: {
    outputStandalone: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});

/**
 * Hide warning of RecoilJS when hot reload
 */
intercept((text) => (text.includes("Duplicate atom key") ? "" : text));

module.exports = nextConfig;
