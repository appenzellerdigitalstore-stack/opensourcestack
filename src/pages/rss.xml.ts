import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getAllListings } from '../lib/listings';

export const GET: APIRoute = async (context) => {
  const listings = getAllListings();
  return rss({
    title: 'OpenSourceStack — New & Updated Open Source Tools',
    description: 'Hand-curated open source SaaS alternatives. RSS feed of new additions and editorial updates.',
    site: context.site ?? 'https://opensourcestack.ink',
    items: listings.slice(0, 30).map((l) => ({
      title: l.name,
      pubDate: new Date(l.dateAdded),
      description: l.shortDescription,
      link: `/listings/${l.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
};
