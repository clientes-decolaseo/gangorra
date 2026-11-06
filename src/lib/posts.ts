import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'posts'>;

/** Data mais recente entre publicação e última atualização. */
export function lastUpdated(post: Post): Date {
  return post.data.dateModified ?? post.data.date;
}

/** True quando o artigo foi atualizado depois do dia da publicação. */
export function wasUpdated(post: Post): boolean {
  const day = 24 * 60 * 60 * 1000;
  return lastUpdated(post).getTime() - post.data.date.getTime() >= day;
}

/** Artigos mais recentes (publicados ou atualizados) primeiro. */
export function sortPostsByFreshness(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => lastUpdated(b).getTime() - lastUpdated(a).getTime(),
  );
}
