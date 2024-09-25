const apiURL = import.meta.env.VITE_API_URL

export const getProducts = async () => {
    const res = await fetch(apiURL)
    const products = await res.json();
    
    return products
}