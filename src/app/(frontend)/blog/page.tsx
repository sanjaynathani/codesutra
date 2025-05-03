import Link from "next/link";
import { formatDate, getBlogPosts } from "src/app/(frontend)/lib/posts";
import { getPayload } from "payload";
import configPromise from '@payload-config'

export const metadata = {
  title: "Blog",
  description: "Writings",
};

export default async function BlogPosts() {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit: 12,
        overrideAccess: false,
        select: {
            title: true,
            slug: true,
            categories: true,
            meta: true,
            publishedAt: true,
            authors: true,
        },
    });

    const postsWithAuthors = await Promise.all(
        posts.docs.map(async (post) => {
            let authorDoc;
            if (post.authors?.[0]) {
                authorDoc = await payload.findByID({
                    id: typeof post.authors[0] === 'object' ? post.authors[0]?.id : post.authors[0],
                    collection: 'users',
                    depth: 0,
                });
            }
            return { ...post, authorDoc };
        })
    );


    return (
    <section>
      <div className="flex justify-start items-start">
          <h1 className="mb-8 text-2xl font-medium">Blogs</h1>
      </div>
      <div>
        {postsWithAuthors
            .sort((a, b) => {
            if (
              new Date(a.publishedAt) >
              new Date(b.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (

             /* <Card className="h-full" doc={post} relationTo="posts" showCategories />*/
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-5 transition-opacity duration-200 hover:opacity-80"
              href={`/blog/${post.slug}`}>
                <div className="w-full flex flex-col space-y-1">
                    <h2 className="text-black dark:text-white">
                        {post.title}
                    </h2>
                    <div className="flex justify-start items-center text-sm">
                        <p className="text-neutral-600 dark:text-neutral-400 tabular-nums">
                            {formatDate(post.publishedAt, true)}
                        </p>
                        <p className="mr-4 ml-4">•</p>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            {post.authorDoc?.name || 'Anonymous'}
                        </p>
                    </div>
                </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
