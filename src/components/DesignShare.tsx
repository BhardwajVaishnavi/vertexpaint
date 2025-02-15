import React, { useState } from 'react';
import { SavedDesign } from '../types/design';

interface DesignShareProps {
  design: SavedDesign;
}

const DesignShare = ({ design }: DesignShareProps) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/designs/${design.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Room Design: ${design.name}`,
          text: `Check out my room design: ${design.name}`,
          url: shareUrl
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      setShowShareOptions(true);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Share Design
      </button>

      {showShareOptions && (
        <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 w-72">
          <div className="mb-4">
            <h3 className="font-medium mb-2">Share Link</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-2 py-1 border rounded"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my room design: ${design.name}`)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-center bg-[#1DA1F2] text-white rounded hover:bg-opacity-90"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-center bg-[#4267B2] text-white rounded hover:bg-opacity-90"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignShare; 