import { getPayload } from "payload";
import configPromise from '@payload-config'
import React, {cache} from "react";
import {draftMode} from "next/headers";
import RichText from "@/components/RichText";
import Image from "next/image";
import {Media} from "@/payload-types"

export const revalidate = 0;

export const metadata = {
    title: "Portfolio",
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
    const content = await queryAbout({ slug })

    if (!content) {
        return (
            <section className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="mb-8 text-2xl font-medium">Content not found</h1>
            </section>
        )
    }
    const profileImage = content.image as Media;
    return (
        <section className="max-w-4xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Profile Image Column */}
                <div className="md:col-span-4 lg:col-span-3">
                    <div className="sticky top-8">
                        {profileImage && (
                            <Image
                                src={profileImage?.url ?? ''}
                                alt={profileImage.alt || "Profile photo"}
                                className="rounded-full bg-gray-100 w-48 h-48 mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
                                width={192}
                                height={192}
                                priority
                            />
                            /*<Media fill priority
                                   imgClassName="rounded-full bg-gray-100 w-48 h-48 mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
                                   resource={profileImage} />*/
                        )}
                    </div>
                </div>

                {/* Content Column */}
                <div className="md:col-span-8 lg:col-span-9">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                        {content.title}
                    </h1>
                    <article className="prose prose-lg prose-quoteless prose-neutral dark:prose-invert max-w-none">
                        <RichText
                            data={content.text}
                            enableGutter={false}
                            className="leading-relaxed"
                        />
                    </article>
                </div>
            </div>
        </section>
    )
}