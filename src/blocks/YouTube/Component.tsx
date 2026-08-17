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
      <div className="relative w-full aspect-video rounded-lg overflow-hidden my-8">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
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
