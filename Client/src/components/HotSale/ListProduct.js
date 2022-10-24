import React, { useEffect } from 'react';
import Product from './Product';
import './ListProducts.css';

function ListProduct(props) {
    const {HotSaleProducts} = props;

    return (
        <div className="hotsale-listproduct">
            {
                HotSaleProducts.map((product, index) => (
                    <Product style={{margin:'0 5px'}} product={product} key={index}></Product>
                ))
            }
        </div>
    );
}

export default ListProduct;