import Header from '../../layout/header';
import Footer from '../../layout/footer';
import React, { useState, useEffect } from 'react'; 

interface feedItem {
    id: number,
    text: string
}

const LiveFeedComponent: React.FC = () => {

    const [feedData, setFeedData] = useState<feedItem[]>([]);

    useEffect(() => {
        const fetchFeedData = async () => {
            try {
                const response = await fetch('');
                const data = await response.json();
            } catch (error) {
                console.error('Error fetching live feed data', error)
            }
        };
        fetchFeedData();

        const refreshInterval = setInterval(fetchFeedData, 60000)

        return () => {
            clearInterval(refreshInterval)
        }
    }, []);

    return (
        <>
        <Header />
        <div>
            <h2>Live Feed</h2>
            <ul>
                {feedData.map((item) => (
                    <li key={item.id}>
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
        <Footer />
        </>
    )
}

export default LiveFeedComponent
