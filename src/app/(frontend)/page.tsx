import { getPayload } from "payload";
import configPromise from '@payload-config'
import React, {cache} from "react";
import {draftMode} from "next/headers";
import RichText from "@/components/RichText";

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
  const slug = 'codesutra-'
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
      <h1 className="mb-8 text-2xl font-medium">
        {post.title}
      </h1>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <RichText className="max-w-[48rem] mx-auto" data={post.text} enableGutter={false} />
      </article>
      </section>
  )
}
