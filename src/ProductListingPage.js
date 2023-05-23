import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=100');
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
         <LazyLoad key={product.id} height={320}>
        <div key={product.id} className="product-card">
          <h3>{product.title}</h3>
          <img src={product.thumbnail} alt={product.name} />
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p className={product.stock < 50 ? 'stock low-stock' : 'stock'}>
            Stock : {product.stock}
          </p>

          <p className={product.stock < 50 ? 'stock low-stock' : 'stock'}>{product.stock < 50 && <span> Hurry! Only a few items left.</span>}</p>
        </div>
        </LazyLoad>
      ))}
    </div>
  );
};

export default ProductListingPage;