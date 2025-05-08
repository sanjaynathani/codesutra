'use client'
import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    LinkedinIcon, XIcon, EmailShareButton, EmailIcon, RedditShareButton, RedditIcon,
} from 'react-share';

interface ShareButtonsProps {
    url: string; // Changed from path to full URL
    title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
    return (
        <div className="flex justify-end items-end gap-8">
            <FacebookShareButton url={url} title={title}>
                <FacebookIcon size={25} round={true}/>
            </FacebookShareButton>

            <TwitterShareButton url={url} title={title}>
                <XIcon size={25} round={true}/>
            </TwitterShareButton>

            <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={25} round={true}/>
            </LinkedinShareButton>

            <RedditShareButton url={url} title={title}>
                <RedditIcon size={25} round={true}/>
            </RedditShareButton>

            <EmailShareButton url={url} title={title}>
                <EmailIcon size={25} round={true}/>
            </EmailShareButton>
        </div>
    );
};

export default ShareButtons;