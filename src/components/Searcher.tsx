import React, { useState } from "react";
import { productSchema } from "../interfaces";
import '../assets/css/searcher.css'
interface SearcherProps {
    products: productSchema[];
}
const Searcher: React.FC <SearcherProps> = ({products}) =>{
    const [filteredProducts, setFilteredProducts] = useState<productSchema[]>([])
    const handleSearch = (query: string) => {
        const results = products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
        setFilteredProducts(results)
        }

    return (
        <div className="searcher-wrapper">
            <input type="text" placeholder="Search" onChange={(e)=> handleSearch(e.target.value)} />
            <div className="filter-wrapper">
               {filteredProducts.map(product => {
                return(
                    <div key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                    </div>
                )
               })} 
            </div>
        </div>
        
    )

}

export default Searcher;