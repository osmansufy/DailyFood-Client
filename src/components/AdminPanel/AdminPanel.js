import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";

const AdminPanel = () => {
    const [productInfo,setProductInfo]=useState({
        name:"",
        weight:"",
        price:""
    })
    const [imageURL, setIMageURL] = useState(null);
    const [successEvent,setSuccessEvent]=useState("")
    const onChangeHandler=(e)=>{
const key=e.target.name;
const value=e.target.value
setProductInfo({
    ...productInfo,
    [key]:value
})
    }

    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'a839fcfa12760a75506230cb4ede1cb9');
        imageData.append('image', event.target.files[0]);
        
        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
        .then(function (response) {
            console.log(response);
          setIMageURL(response.data.data.display_url);
        })
        .catch(function (error) {
          console.log(error);
        });
    
      }
      const addNewProducts=()=>{
          const newProduct={
              ...productInfo,
              imageURL
          }
          axios.post('http://localhost:5000/addProduct',newProduct).then(res=>{
              console.log(res);
              afterProductAdd(res)
          }).catch(err=>{
              console.log(err);
          })
      }
      const afterProductAdd=(res)=>{
        setSuccessEvent(res.data)
        setProductInfo({
            name:"",
            weight:"",
            price:"" 
        })
        setIMageURL("")
      }
      console.log(imageURL);
  return (
    <div className=" w-100 " style={{overflow:"hidden"}}>
      <div className="row">
        <div className="col-md-3 " >

            <AdminNav />
    
      
        </div>
        <div className="col-md-9 mt-5">
          <h4 className="text-start">Add Product</h4>
          <form className="bg-light p-2" action="">
            <div className="row">
              <div className="col-md-6">
             
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label w-100 text-left"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={productInfo.name}
                    onChange={onChangeHandler}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div className="col-md-6">
                {" "}
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label w-100 text-left"
                  >
                  Wight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={productInfo.weight}
                    onChange={onChangeHandler}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label w-100 text-left"
                  >
                Add Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={productInfo.price}
                    onChange={onChangeHandler}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div className="col-md-6">
                {" "}
                <Form.File id="formcheck-api-custom"   custom>
                  <Form.File.Input isValid onChange={handleImageUpload} />
                </Form.File>
              </div>
            </div>
            <Button className="d-flex" onClick={addNewProducts} variant="success">Send</Button>
          </form>
        </div>
        {
            successEvent? <p>{successEvent}</p>:""
        }
      </div>
    </div>
  );
};

export default AdminPanel;
