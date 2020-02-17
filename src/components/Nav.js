/**
 * @Author: dylanlawless
 * @Date:   2020-01-15T10:04:17+00:00
 * @Last modified by:   dylanlawless
 * @Last modified time: 2020-02-17T00:55:04+00:00
 */
 import React from 'react';
 import './App.css';
 import { NavLink } from 'react-router-dom';
 import Nav from 'react-bootstrap/Nav'
 import { Navbar, Form, Button} from 'react-bootstrap';




 class MyNav extends React.Component{


     logout = () => {
         localStorage.removeItem('jwtToken');
         this.props.onLogout();
     }



 render(){
     const loggedIn = this.props.loggedIn;
     return(

         <div className="">
         <Navbar className="my-nav">
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="mr-auto">
           <div className="navbar-links">

             <NavLink className="navbar-link" activeClassName="chosen" exact to="/">Home</NavLink>

             <NavLink className="navbar-link" activeClassName="chosen" to="/fixtures">Fixtures</NavLink>

            </div>
            <Navbar.Brand className=" logo-centre" href="#">
            </Navbar.Brand>

           </Nav>
           <Form inline>
                {(loggedIn) ? (
                    <NavLink onClick={this.logout} activeClassName="chosen" to="/login">
                        <Button className="nav-button">Logout</Button>
                    </NavLink>
                ) : (
                    <>
                    <div className="navbar-links">
                    <NavLink className="navbar-link" activeClassName="chosen" to="/login">Log in</NavLink>
                    </div>
                    <NavLink  activeClassName="chosen" to="/register"><Button className="nav-button">Sign up</Button></NavLink>
                    </>
                )}

           </Form>
            </Navbar.Collapse>
         </Navbar>

         </div>

     );

 }


 }

 export default MyNav;
