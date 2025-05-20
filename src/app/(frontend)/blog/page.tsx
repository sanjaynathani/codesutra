import Link from "next/link";
import { formatDate, getBlogPosts } from "src/app/(frontend)/lib/posts";
import { getPayload } from "payload";
import configPromise from '@payload-config'

export const revalidate = 0;

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
        where: {}, // Add an empty where clause if you don't need filtering
        sort: '-createdAt', // Optional: sort by creation date descending
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

    return (
        <section>
            <div className="flex justify-start items-start">
                <h1 className="mb-8 text-2xl font-medium">Blogs</h1>
            </div>
            <div>
                {posts.docs
                    .sort((a, b) => {
                        const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(0);
                        const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(0);
                        return dateB.getTime() - dateA.getTime();
                    })
                    .map((post, index, array) => (
                        <div key={post.slug}>
                            <Link
                                className="flex flex-col space-y-1 mb-4 transition-opacity duration-200 hover:opacity-80"
                                href={`/blog/${post.slug}`}>
                                <div className="w-full flex flex-col space-y-1">
                                    <h2 className="text-black dark:text-white">
                                        {post.title}
                                    </h2>
                                    <div className="flex justify-start items-center text-[10px]">
                                        <p className="text-neutral-600 dark:text-neutral-400">
                                            {post?.categories?.length
                                                ? '#' + post.categories.map(cat => typeof cat === 'string' ? cat : cat.title).join(' #')
                                                : '#Uncategorized'
                                            }
                                        </p>
                                        <p className="text-neutral-600 dark:text-neutral-400 tabular-nums mr-2 ml-2">•</p>
                                        <p className="text-neutral-600 dark:text-neutral-400 tabular-nums">
                                            {post.publishedAt ? formatDate(post.publishedAt, true) : ''}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            {/* Add separator only between posts (not after the last one) and only if there's more than one post */}
                            {array.length > 1 && index < array.length - 1 && (
                                <div className="border-t border-neutral-200 dark:border-neutral-800 my-4" />
                            )}
                        </div>
                    ))}
            </div>
        </section>
    );

}
