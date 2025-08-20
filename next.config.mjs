/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'picsum.photos',
    ],
    remotePatterns: [
      {
        protocol: 'https',        
        hostname: '**',           
        port: '',                 
        pathname: '/**',          
      },
    ],
  },
}

export default nextConfig;
