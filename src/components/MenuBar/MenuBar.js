import React, { useContext } from 'react';
import { Button, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SignInContext, UserContext } from '../../App';
import UserMenu from '../UserMenu/UserMenu';

const MenuBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isSignIn, setIsSignIn] = useContext(SignInContext);
    return (
        <Container className="mb-5 mt-3">
            <div className="row justify-content-between">
                <div className="col-md-6"><Link to="/"><h3 className="text-start">DailyFood</h3></Link> </div>
                <div className="col-md-6">  
                <Nav variant="pills" className="justify-content-between align-items-center" defaultActiveKey="/home">
        <Nav.Item>
          <Link to="/">Home</Link>
        </Nav.Item>
        <Nav.Item>
        <Link to="/orders">Orders</Link>
        </Nav.Item>
        <Nav.Item>
        <Link to="/admin">Admin</Link>
        </Nav.Item>
        <Nav.Item>
        {isSignIn ? (
            <UserMenu userName={loggedInUser.name} />
          ) : (
            <Link to="/login"><Button variant="danger">Login</Button></Link>
          )}
      
        </Nav.Item>
      
      </Nav></div>
      
      </div>
      </Container>
    );
};

export default MenuBar;