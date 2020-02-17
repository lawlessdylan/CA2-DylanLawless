/**
 * @Author: dylanlawless
 * @Date:   2020-01-31T16:54:13+00:00
 * @Last modified by:   dylanlawless
 * @Last modified time: 2020-02-17T14:12:14+00:00
 */


  import React, {
      Component
  } from 'react';
  import { Card, Form, Button} from 'react-bootstrap';
  import '../styles/forms.css';
  import axios from 'axios';

  import {
    Link
  } from "react-router-dom";

  class Signup extends Component {



      constructor(props) {
        super(props);

        this.state = {
          email: '',
          name: '',
          password: '',
          confirmPassword: ''
        };

      }


      handleInputChange = e => {
           const target = e.target;
           const value = target.type === 'checkbox' ? target.checked : target.value;
           const name = target.name;

           console.log(`Input name ${name}. Input value ${value}.`);

           this.setState({
             [name]: value
           });
         };


        onSubmit = e => {
          e.preventDefault();

          const user = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
          }

          console.log(user);

       axios.post(process.env.REACT_APP_BACKENED + '/account/register', user)
         .then(res => console.log(res.data))
         .catch(err => console.log(err));

   };





      render() {
          return (

              <div className = "container" >
                  <div className="center-div col-6 submit-form">
                  <Card className="signin-card">
                       <Card.Body>
                         <Card.Title className="title-card">sign up.</Card.Title>

                         <Form onSubmit={this.onSubmit}>
                                <Form.Group>

                                 <Form.Control className="form-input" type="email" placeholder="Email"
                                     name="email"
                                     value={this.state.email}
                                     onChange={this.handleInputChange}
                                   />




                                </Form.Group>
                                <Form.Group>
                                 <Form.Control className="form-input" type="text" placeholder="Name"
                                     name="name"
                                     value={this.state.name}
                                     onChange={this.handleInputChange}
                                   />

                                </Form.Group>

                                <Form.Group>
                                <Form.Control className="form-input" type="password" placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                      />
                                </Form.Group>
                                <Form.Group>
                                     <Form.Control className="form-input" type="password" placeholder="Confirm password"
                                     name="confirmPassword"
                                     value={this.state.confirmPassword}
                                     onChange={this.handleInputChange}
                                      />

                                </Form.Group>

                                        <Button variant="primary" className="nav-button button-submit" type="submit">
                                         Sign in
                                        </Button>

                                </Form>

                       </Card.Body>

                     </Card>

                  </div>

              </div>
          );
      }
  }

  export default Signup;
