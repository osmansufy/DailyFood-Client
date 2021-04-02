import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import axios from '../../axios'
import { UserContext } from '../../App';
import MenuBar from '../MenuBar/MenuBar';
const Orders = () => {
    const [orders,setOrders]=useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        axios.get('/orders?email='+loggedInUser.email, {
           headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res=>{
            console.log(res);
            setOrders(res.data)
        })
        .catch(err=>{
            console.log(err);
        })
    
    }, [])
    const orderDate=(date)=>{
        const order = new Date(date);
        
const date1 = order.getDate();
const month=order.getMonth()+1
const year=order.getFullYear()
const fullDate=`${date1}-${month}-${year}`
return fullDate
    }
    return (
    <div className="container">
<MenuBar />



<div className="col-md-12">
    <h3>Your Order History</h3>
    <Table striped bordered hover size="sm">
<thead>
<tr>
<th>Order Id</th>
<th>Products</th>
<th>Price</th>
<th>Quantity</th>
<th>Order Date</th>
<th>Order Status</th>
</tr>
</thead>
<tbody>
{orders?.map(order=>(
<tr>
    <td>
        {order._id}
    </td>
    <td>
        {order.productName}
    </td>
    <td>
        {order.price}
    </td>
    <td>
        {order.quantity}
    </td>
    <td>
        {  orderDate(order.date)}
    </td>
    <td>
       Received
    </td>
</tr>
))}


</tbody>
</Table>
</div>  
</div>
    );
};

export default Orders;