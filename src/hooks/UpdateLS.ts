import { useEffect } from "react"
import { cartProductSchema } from "../interfaces"
interface updateLocalStorageProps {
cartProducts: cartProductSchema[]
}
export function UpdateLocalStorage ({cartProducts}: updateLocalStorageProps) {

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts))
      }, [cartProducts])
    
}