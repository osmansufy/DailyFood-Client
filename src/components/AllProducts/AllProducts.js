import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import SingleProduct from "./SingleProduct";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = () => {
    axios
      .get("/products")
      .then((res) => {
        console.log(res);
        setAllProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <section>
      {allProducts.length==0 && <Spinner size="lg" animation="grow" variant="success"  />}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {allProducts?.map((product) => (
          <div className="col">
         <SingleProduct product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
