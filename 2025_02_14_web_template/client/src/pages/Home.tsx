import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        console.log('Here');
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/health`);
                const data = await response.json();
                console.log('[App.tsx] data: ', data);
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                return null;
            }
        }
        fetchData();
    }, []);

    return <h1 className="text-3xl font-bold underline text-red-500">Hello world!</h1>;
};

export { Home };
