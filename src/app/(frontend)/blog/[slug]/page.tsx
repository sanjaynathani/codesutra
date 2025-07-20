import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { generateMeta } from '@/utilities/generateMeta'
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import {getServerSideURL} from "@/utilities/getURL";

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
        collection: 'posts',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    const params = posts.docs.map(({ slug }) => {
        return { slug }
    })

    return params
}

type Args = {
    params: Promise<{
        slug?: string
    }>
}

export default async function Post({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode()
    const { slug = '' } = await paramsPromise
    const path = '/blog/' + slug
    const post = await queryPostBySlug({ slug })

    if (!post) return <PayloadRedirects url={path} />

    // Generate the full URL on the server side
    const baseUrl = getServerSideURL()
    const fullUrl = `${baseUrl}${path}`


    return (
        <article className="prose prose-quoteless prose-neutral dark:prose-invert">
            {/*<PostHero post={post} />*/}
            <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
            {/* Add ShareButtons component */}
            <div className="flex justify-end items-end mt-8">
                <ShareButtons
                    url={fullUrl}
                    title={post.title || 'Check out this article'}
                />
            </div>
        </article>
    )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { slug = '' } = await paramsPromise
    const post = await queryPostBySlug({ slug })

    return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'posts',
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
