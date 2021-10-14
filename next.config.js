const withMDX = require('@next/mdx')();
const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pwa: {
    dest: 'public',
    // disable: process.env.NODE_ENV === 'development',
    // register: true,
    // scope: '/app',
    // sw: 'service-worker.js',
    //...
  },
  eslint: {
    dirs: [
      'components',
      'constants',
      'context',
      'intl',
      'pages',
      'types',
      'utils',
    ],
  },
  i18n: {
    defaultLocale: 'cn',
    localeDetection: false,
    locales: ['en', 'ja','cn'],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  rewrites: () => [
    {
      destination: '/api/ads',
      source: '/ads.txt',
    },
  ],
};

module.exports = withPWA(withMDX(nextConfig));
