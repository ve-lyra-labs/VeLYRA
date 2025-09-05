import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example: disallow indexing of a private area
    },
    sitemap: 'https://www.your-domain.com/sitemap.xml', // Replace with your actual domain
  }
}