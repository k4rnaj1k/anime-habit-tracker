'use client';

import { useEffect, useState } from 'react';

const bgImgs = [
    '/pic/1311951.jpg',
    '/pic/1332278.jpeg',
    '/pic/1340411.jpeg',
    '/pic/1345576.jpeg'
];

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
    const [image, setImage] = useState(() => bgImgs[Math.floor(Math.random() * bgImgs.length)]);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextImage = bgImgs[Math.floor(Math.random() * bgImgs.length)];
            setImage(nextImage);
        }, 20000); // Change every 5s

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                paddingLeft: '2%',
                paddingRight: '2%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
            }}
        >
            {children}
        </div>
    );
}
