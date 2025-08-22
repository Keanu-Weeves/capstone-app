import { useState, useEffect } from 'react';

const useFetchCategoryMeals = (category = 'Seafood') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setData(json.meals);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMeals();
    }, [category]);

    return { data, loading, error };
}

export default useFetchCategoryMeals;