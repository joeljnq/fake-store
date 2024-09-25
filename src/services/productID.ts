const API_PRODUCT = import.meta.env.VITE_API_PRODUCT
export const getProduct = async (productID:string) => {
    if (!productID) {
        throw new Error("Invalid product ID");
    }
    try {
        const response = await fetch(`${API_PRODUCT}${productID}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        
        return data;
     
    } catch (err) {
        console.log(err);

    } 
}