import { getPayload } from "payload";
import configPromise from '@payload-config'
import React, {cache} from "react";
import {draftMode} from "next/headers";
import RichText from "@/components/RichText";
import Image from "next/image";

export const revalidate = 0;

export const metadata = {
    title: "About",
    description: "What's Code Sutra?",
};

const queryAbout = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'contents',
        draft,
        limit: 1,
        overrideAccess: draft,
        pagination: false,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
})

export default async function About() {
    const slug = 'sanjay-nathani'
    const post = await queryAbout({ slug })

    if (!post) {
        return (
            <section>
                <h1 className="mb-8 text-2xl font-medium">Content not found</h1>
            </section>
        )
    }

    return (
        <section>
            <a href="/" target="_blank">
                <Image
                    src="/profile.png"
                    alt="Profile photo"
                    className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
                    unoptimized
                    width={160}
                    height={160}
                    priority
                />
            </a>
            <h1 className="mb-8 text-2xl font-medium">
                {post.title}
            </h1>
            <article className="prose prose-quoteless prose-neutral dark:prose-invert">
                <RichText className="max-w-[48rem] mx-auto" data={post.text} enableGutter={false} />
            </article>
        </section>
    )
}