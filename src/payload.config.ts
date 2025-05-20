import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";
import {Users} from "@/collections/Users";
import {fileURLToPath} from "url";
import {vercelBlobStorage} from "@payloadcms/storage-vercel-blob";
import {Media} from "@/collections/Media";
import {Posts} from "@/collections/Posts";
import {Categories} from "@/collections/Categories";
import { Contents } from '@/collections/Content';
import {getServerSideURL} from "@/utilities/getURL";
import Redirects from "../redirects";
import {redirectsPlugin} from "@payloadcms/plugin-redirects";
import {seoPlugin} from "@payloadcms/plugin-seo";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    // If you'd like to use Rich Text, pass your editor here
    editor: lexicalEditor(),

    // Define and configure your collections in this array
    collections: [Users, Media, Posts, Contents, Categories],
    cors: [getServerSideURL()].filter(Boolean),

    // Your Payload secret - should be a complex and secure string, unguessable
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    // Whichever Database Adapter you're using should go here
    // Mongoose is shown as an example, but you can also use Postgres
    db: mongooseAdapter({
        url: process.env.MONGODB_URI || '',
    }),
    plugins: [
        vercelBlobStorage({
            collections: {
                media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || '',
        }),
        redirectsPlugin({
            collections: ['posts', 'contents'], // collections to enable redirect to
        }),
        seoPlugin({
            collections: [
                'posts'
            ],
            uploadsCollection: 'media',
            generateTitle: ({ doc }) => `codesutra.dev — ${doc.title}`,
            generateDescription: ({ doc }) => doc.content,
            generateURL: ({ doc, collectionSlug }) =>
                `https://codesutra.dev/blog/${doc?.slug}`,
        })
    ],
    // If you want to resize images, crop, set focal point, etc.
    // make sure to install it and pass it to the config.
    // This is optional - if you don't need to do these things,
    // you don't need it!
    sharp,
})