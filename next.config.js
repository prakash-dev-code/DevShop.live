/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dev-shop-images-bucket.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'another-example.com',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
  // experimental: {
  //     appDir: true,
  //     serverComponentsExternalPackages: ['@myorg/my-package'],
  // },
  // outputFileTracingExcludes: [
  //     // Exclude specific files or directories from output tracing
  //     '**/node_modules/some-package/**',
  //     '**/dist/**',
  // ],
};

module.exports = nextConfig;
