import { getPayload } from "payload";
import configPromise from '@payload-config'
import React, {cache} from "react";
import {draftMode} from "next/headers";
import RichText from "@/components/RichText";
import Image from "next/image";

export const revalidate = 0;

export const metadata = {
    title: "Work",
    description: "Overview of my work.",
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
    const slug = 'my-work'
    const content = await queryAbout({ slug })

    if (!content) {
        return (
            <section className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="mb-8 text-2xl font-medium">Content not found</h1>
            </section>
        )
    }

    return (
        <section>
            <div className="flex justify-start items-start">
                <h1 className="mb-8 text-2xl font-medium">{content.title}</h1>
            </div>
            <RichText className="leading-relaxed" data={content.text} enableGutter={false}/>
        </section>
    )
}