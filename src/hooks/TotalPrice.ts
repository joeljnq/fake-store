import { useEffect, useState } from "react"
import { cartProductSchema } from "../interfaces"

interface TotalPriceProps {
    products: cartProductSchema[]
}
export function useTotalPrice ({products}:TotalPriceProps){
    const [subtotal, setSubtotal] = useState<number>(0)

    useEffect(()=>{
        let sum = 0
        products.forEach(product => {
            const quantity =  product.price * product.quantity
            sum += quantity
        })
        setSubtotal(Math.round(sum * 100) / 100)
    },[products])
    return {subtotal}
} 