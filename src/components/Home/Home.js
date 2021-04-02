import React from 'react';
import { Nav } from 'react-bootstrap';
import AllProducts from '../AllProducts/AllProducts';
import MenuBar from '../MenuBar/MenuBar';

const Home = () => {
    return (
        <div>
    <MenuBar />
<div className="container">
<AllProducts />
</div>
        </div>
    );
};

export default Home;