import React from "react";
import ProductCard from "../ProductCard";


const HomeRandomProducts = ({ products }) => {
    return (
        <div id="randomProductContainer">
            <h2>Produtcs</h2>
            <div id="randomProducts">
                {products.map((product) => (
                    <div key={product.id} className="product-slide-item">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    )

}
export default HomeRandomProducts;