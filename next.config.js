/** @type {import('next').NextConfig} */
const nextPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/',
});

module.exports = nextPWA({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_BASE_URL: 'http://localhost:4500',
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['https://res.cloudinary.com/'],
  },
  experimental: {
    scrollRestoration: true,
  },
});
