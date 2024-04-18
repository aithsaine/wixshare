import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ file }: any) {
    const playerRef = useRef<any>(null);

    const handleFocus = () => {
        if (playerRef.current) {
            const player = playerRef.current?.getInternalPlayer();
            if (player) {
                player.play();
            }
        }
    };

    return (
        <div>
            {file && (
                <video
                    src={file}
                    controls={true}
                    width="100%"
                    height="auto"
                    tabIndex={0} // Ensure the element is focusable
                    onFocus={handleFocus}
                />
            )}
        </div>
    );
}
