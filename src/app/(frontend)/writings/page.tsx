import Link from "next/link";
import { formatDate, getBlogPosts } from "src/app/(frontend)/lib/posts";
import { getPayload } from "payload";
import configPromise from '@payload-config'

export const revalidate = 0;

export const metadata = {
  title: "Writings",
  description: "Writings",
};

export default async function Writings() {
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
            tags: true,
            meta: true,
            publishedAt: true,
            authors: true,
        },
    });

    return (
        <section>
            <div className="flex justify-start items-start">
                <h1 className="mb-8 text-2xl font-medium">Writings</h1>
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
                                className="group flex flex-col space-y-1 mb-4 p-4 -mx-4 rounded-xl transition-flow hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                                href={`/writings/${post.slug}`}>
                                <div className="w-full flex flex-col space-y-1">
                                    <h2 className="text-xl text-black dark:text-white font-serif mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:via-emerald-500 group-hover:to-turquoise-500 dark:group-hover:from-teal-400 dark:group-hover:via-emerald-400 dark:group-hover:to-turquoise-400 transition-all duration-300">
                                        {post.title}
                                    </h2>
                                    <div className="flex justify-start items-center text-xs space-x-2">
                                        <p className="text-neutral-500 dark:text-neutral-400">
                                            {post.publishedAt ? formatDate(post.publishedAt, true) : ''}
                                        </p>
                                        <p className="text-accent-light dark:text-accent-dark font-medium">
                                            {post?.tags
                                                ? '#' + post.tags.split(',').map(tag => tag.trim()).filter(Boolean).join(' #')
                                                : ''
                                            }
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
