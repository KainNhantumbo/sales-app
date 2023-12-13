const nextPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/',
});

/** @type {import('next').NextConfig} */
module.exports = nextPWA({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_BASE_URL: ''
  },
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        hostname: 'https://res.cloudinary.com/'
      }
    ]
  },
  experimental: {
    scrollRestoration: true
  }
});
