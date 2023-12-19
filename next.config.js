const nextPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  register: true,
  scope: '/',
});

/** @type {import('next').NextConfig} */
module.exports = nextPWA({
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false,
  productionBrowserSourceMaps: false,
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        hostname: 'https://res.cloudinary.com/'
      }
    ]
  }
});
