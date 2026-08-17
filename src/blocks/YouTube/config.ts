import type { Block } from 'payload'

export const YouTube: Block = {
  slug: 'youtube',
  interfaceName: 'YouTubeBlock',
  fields: [
    {
      name: 'videoId',
      type: 'text',
      required: true,
      label: 'YouTube Video ID',
      admin: {
        description: 'The ID of the YouTube video. (e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ, the ID is dQw4w9WgXcQ)',
      },
    },
  ],
}
