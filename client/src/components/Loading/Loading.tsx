import { useState, useEffect } from 'react';
import './Loading.css';

const Loading = () => {
    const [loading, setLoading] = useState<string>('Loading');

    useEffect(() => {
        const interval = setInterval(() => {
            setLoading((prevLoading) => {
                const dotsCount = (prevLoading.match(/\./g) || []).length;
                const newDots = dotsCount >= 3 ? '' : '.'.repeat(dotsCount + 1);
                return `Loading${newDots}`;
            });
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="Loading">
            <h2 className="LoadingText">{loading}</h2>
        </div>
    );
};

export default Loading;
