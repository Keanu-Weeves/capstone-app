export function generatePriceFromId(idMeal) {
    let hash = 0;
    for (let i = 0; i < idMeal.length; i ++) {
        hash = idMeal.charCodeAt(i) + ((hash << 5) - hash);
    }
    const price = 10 + (Math.abs(hash) % 2000) / 100; // $10-30
    return Number(price.toFixed(2));
}