'use client'
import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
} from 'react-share';
import {getServerSideURL} from "@/utilities/getURL";

interface ShareButtonsProps {
    path: string;
    title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ path, title }) => {
    // Remove any leading slashes for path joining
    const cleanPath = path.replace(/^\/+/, '');
    const url = `${getServerSideURL()}/${cleanPath}`;

    return (
        <div className="flex justify-end items-end gap-8">
            <FacebookShareButton url={url} title={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
        </div>
    );
};

export default ShareButtons;