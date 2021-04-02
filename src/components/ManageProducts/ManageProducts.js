import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AdminNav from '../AdminNav/AdminNav';

const ManageProducts = () => {
    const [allProducts,setAllProducts]=useState([])
  
    const fetchProducts=()=>{
        axios.get('/products').then(res=>{
            console.log(res);
            setAllProducts(res.data)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const onDeleteProduct=(id)=>{
        axios.delete(`/deleteProduct/${id}`)
        .then(res=>{
            console.log(res);
            if(res.data){
                fetchProducts()
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        fetchProducts()
    },[])
   
    return (
        <div className="row">
              <div className="col-md-3">

<AdminNav />


</div>
<div className="col-md-9 mt-4 text-start">
    <h4>All Products</h4>
          <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Product</th>
      <th>Weight</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
      {allProducts?.map(product=>(
  <tr key={product._id}>
  <td>{product.name}</td>
  <td>{product.weight}</td>
  <td>{product.price}</td>
  <td className="d-flex"><i className="fas fa-edit"></i>
 <a onClick={()=>onDeleteProduct(product._id)}>
 <i className="fas text-danger fa-trash-alt"></i>
     </a> </td>
</tr>
      ))}
  
 
  </tbody>
</Table>
</div>  
        </div>
    );
};

export default ManageProducts;