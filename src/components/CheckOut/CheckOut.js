import axios from '../../axios';
import React, { useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { OrderContext, UserContext } from '../../App';
import MenuBar from '../MenuBar/MenuBar';

const CheckOut = () => {
    const [orderProducts,setOrderProducts]=useContext(OrderContext)
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(orderProducts,loggedInUser);
    const onCreateOrder=()=>{
      const newOrder={
        email:loggedInUser.email,
        name:loggedInUser.name,
        date:new Date(),
        productName:orderProducts.name,
        quantity:1,
        price:orderProducts.price
      }
      axios.post('/createOrder',newOrder)
      .then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    }
    return (
        <div className="container">
            <MenuBar />
            <h4>CheckOut</h4>
       <Table striped bordered hover size="sm">
  <thead>
    <tr>
    
      <th>Product Name</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
      {orderProducts ?
 <tr>
 <td>{orderProducts.name}</td>
 <td>1</td>
 <td>{orderProducts.price}</td>

</tr>:""
      }
   
   
  </tbody>
</Table>
<Button onClick={onCreateOrder} variant="success">CheckOut</Button>
        </div>
    );
};

export default CheckOut;