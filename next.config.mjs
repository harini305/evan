/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/about-us', destination: '/#about', permanent: true },
      { source: '/awards-%26-accolades', destination: '/#clients', permanent: true },
      { source: '/comedy-solutions', destination: '/#solutions', permanent: true },
      { source: '/video-solutions', destination: '/#work', permanent: true },
      { source: '/engagement-%40-events', destination: '/#solutions', permanent: true },
      { source: '/behavioural-training', destination: '/#solutions', permanent: true },
      { source: '/video-gallery', destination: '/#work', permanent: true },
      { source: '/our-clients', destination: '/#clients', permanent: true },
      { source: '/contact-us', destination: '/#contact', permanent: true },
    ];
  },
};

export default nextConfig;
