import { useState, useEffect } from 'react';

const useFetchMeals = (category = 'Seafood', count = 3) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const responses=await Promise.all(
                    Array.from({ length: count }).map(() =>
                    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
                    )
                );

                let meals = [];
                for (const response of responses) {
                    const json = await response.json();
                    if (json.meals && json.meals.length > 0) {
                        meals.push(json.meals[0]);
                    }
                }
                setData(meals);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [category, count]);

    return { data, loading, error };
};

export default useFetchMeals;