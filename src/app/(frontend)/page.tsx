import Link from "next/link";
import { formatDate } from "src/app/(frontend)/lib/posts";
import { getPayload } from "payload";
import configPromise from '@payload-config'
import { ArrowRight } from "lucide-react";
import RichText from '@/components/RichText';

export const revalidate = 0;

export const metadata = {
    title: "CodeSutra",
    description: "Writings by CodeSutra",
};

export default async function Home() {
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
            populatedAuthors: true,
        },
    });

    // Fetch the author bio content by its specific slug
    const contents = await payload.find({
        collection: 'contents',
        where: {
            slug: {
                equals: 'sanjay-short-bio'
            }
        },
        limit: 1,
    });
    const authorContent = contents.docs[0];

    return (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative mt-12 lg:mt-24">
            {/* Left Sidebar (Sticky Author Profile) */}
            <div className="lg:col-span-4 relative">
                <div className="lg:sticky lg:top-32">
                    <h1 className="text-4xl lg:text-5xl font-serif font-bold text-neutral-900 dark:text-neutral-50 mb-6 tracking-tight">
                        {authorContent?.populatedAuthors?.[0]?.name || 'Sanjay'}
                    </h1>
                    <div className="w-12 h-1 bg-teal-500 mb-6 rounded-full"></div>
                    <div className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-serif prose-p:my-2 prose-a:text-teal-600 dark:prose-a:text-teal-400">
                        {authorContent?.text ? (
                            <RichText data={authorContent.text} enableGutter={false} />
                        ) : (
                            <p>
                                Software architect and intuitive writer. Exploring the intersection of code, cinema, and the stories we tell ourselves.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Content (Writings Feed) */}
            <div className="lg:col-span-8">
                <h2 className="text-sm font-semibold tracking-widest text-teal-600 dark:text-teal-400 uppercase mb-8 border-b border-neutral-200 dark:border-neutral-800/50 pb-4">Latest Writings</h2>
                <div className="flex flex-col">
                    {posts.docs
                        .sort((a, b) => {
                            const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(0);
                            const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(0);
                            return dateB.getTime() - dateA.getTime();
                        })
                        .map((post, index) => (
                            <div key={post.slug} className="group border-b border-neutral-200 dark:border-neutral-800/50 py-8 last:border-0 relative">
                                <Link
                                    className="flex flex-col space-y-3 relative z-10"
                                    href={`/writings/${post.slug}`}>

                                    <div className="flex justify-start items-center text-xs space-x-2">
                                        {post.populatedAuthors && post.populatedAuthors.length > 0 && (
                                            <>
                                                <p className="text-neutral-600 dark:text-neutral-400 font-medium tracking-wide">
                                                    {post.populatedAuthors.map((a: any) => a.name).join(', ')}
                                                </p>
                                                <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
                                            </>
                                        )}
                                        <p className="text-neutral-500 dark:text-neutral-500 font-medium">
                                            {post.publishedAt ? formatDate(post.publishedAt, true) : ''}
                                        </p>
                                    </div>

                                    <h2 className="text-2xl md:text-3xl text-neutral-900 dark:text-neutral-100 font-serif font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-emerald-500 dark:group-hover:from-teal-400 dark:group-hover:to-emerald-300 transition-all duration-300 pr-12">
                                        {post.title}
                                    </h2>

                                    <div className="flex items-center text-teal-600 dark:text-teal-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 absolute right-0 top-1/2 -translate-y-1/2">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>

                                    <p className="text-xs text-accent-light dark:text-accent-dark font-medium mt-2">
                                        {post?.tags
                                            ? '#' + post.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean).join(' #')
                                            : ''
                                        }
                                    </p>
                                </Link>

                                {/* Subtle hover background highlight */}
                                <div className="absolute inset-0 -mx-6 bg-neutral-50/50 dark:bg-neutral-800/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}
