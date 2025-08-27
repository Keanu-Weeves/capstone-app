import { useState, useEffect } from 'react';

const useFetchCategories = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setData(json.meals);
            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return { data, loading, error };
};

export default useFetchCategories;