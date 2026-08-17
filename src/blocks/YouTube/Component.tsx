import React from 'react'

export type YouTubeBlockProps = {
  videoId: string
  blockType: 'youtube'
}

type Props = YouTubeBlockProps & {
  className?: string
}

export const YouTubeBlock: React.FC<Props> = ({ className, videoId }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <div className="w-full rounded-2xl overflow-hidden my-8 shadow-xl border border-neutral-200 dark:border-neutral-800 flex">
        <iframe
          className="w-full border-0"
          style={{ aspectRatio: '16/9' }}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}
