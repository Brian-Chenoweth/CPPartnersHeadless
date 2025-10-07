const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [
      getWpHostname(),             
      'cms.calpolypartners.org',   
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        source: '/news/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2024/05/PTRS_logo_rev.png',
        destination: 'https://cms.calpolypartners.org/wp-content/uploads/2023/08/logo_rev.png',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2023/08/logo_grn.png',
        destination: 'https://cms.calpolypartners.org/wp-content/uploads/2025/10/logo_grn.png',
        permanent: true,
      },
    ];
  },
});
