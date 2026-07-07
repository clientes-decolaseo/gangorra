import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    summary: z.string(),
    details: z.string(),
    order: z.number(),
  }),
});

const servicesDetail = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    shortTitle: z.string(),
    h1: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    lede: z.string(),
    sections: z.object({
      whatItIs: z.string(),
      forWhom: z.string(),
      howItWorks: z.array(z.string()),
      whyGangorra: z.string(),
    }),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
    whatsappMessage: z.string(),
    ctaLabel: z.string(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: z.string(),
      category: z.string(),
      image: image(),
      alt: z.string(),
      description: z.string(),
      link: z
        .object({
          url: z.string(),
          label: z.string(),
        })
        .optional(),
      order: z.number(),
    }),
});

const team = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      name: z.string(),
      jobTitle: z.string(),
      photo: image(),
      photoAlt: z.string(),
      bio: z.string(),
      description: z.string(),
      credentials: z.array(z.string()),
      alumniOf: z.array(z.string()),
      knowsAbout: z.array(z.string()),
    }),
});

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: z.string(),
      excerpt: z.string(),
      coverImage: image(),
      coverAlt: z.string(),
      date: z.date(),
      seoTitle: z.string(),
      seoDescription: z.string(),
    }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    rating: z.number(),
    context: z.string().optional(),
    text: z.string(),
  }),
});

export const collections = {
  services,
  servicesDetail,
  projects,
  team,
  posts,
  testimonials,
};
