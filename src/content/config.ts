import { defineCollection, z } from 'astro:content';

// 作品集合：每个作品是一个 .md 文件
const works = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleZh: z.string().optional(),
    year: z.number(),
    youtubeId: z.string(),       // YouTube 视频 ID，如 'dQw4w9WgXcQ'
    order: z.number().default(99), // 排序权重，数字越小越靠前
    featured: z.boolean().default(false),
  }),
});

// 演出集合
const performances = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleZh: z.string().optional(),
    date: z.date(),
    venue: z.string(),
    venueZh: z.string().optional(),
    rsvpUrl: z.string().url().optional(),
    status: z.enum(['upcoming', 'tba', 'past']).default('upcoming'),
  }),
});

export const collections = { works, performances };
