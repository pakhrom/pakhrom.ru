import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogRus = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/data/blog/russian" }),
  schema: z.object({
    pageTitle: z.string().nonempty().max(30),
    title: z.string().nonempty().max(70),
    description: z.string().nonempty().optional(),
    tags: z.array(z.string().nonempty()),
    publicationDate: z.coerce.date(),
    lastUpdatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blogRus };
