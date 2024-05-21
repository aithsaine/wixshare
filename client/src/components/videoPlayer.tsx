import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ file }: any) {
    const playerRef = useRef<any>(null);



    return (
        <div>
            {file && (
                <video
                    src={file}
                    width="100%"
                    className='rounded-xl'
                    height="auto"
                    controls
                    muted
                />
            )}
        </div>
    );
}
