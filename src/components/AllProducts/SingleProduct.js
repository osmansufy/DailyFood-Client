import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { OrderContext } from '../../App';

const SingleProduct = (props) => {
    const {imageURL,price,name}=props.product
    const history=useHistory()
    const [orderProducts,setOrderProducts]=useContext(OrderContext)
    const onOrder=()=>{
        setOrderProducts(props.product)
        history.push('/checkOut')
    }
    return (
        <div className="card h-100">
        <img
          height="200"
          src={imageURL}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <p>{price}</p>
          <Button onClick={onOrder} variant="success">Buy Now</Button>
        </div>
      </div>
    );
};

export default SingleProduct;