/**
 * @Author: dylanlawless
 * @Date:   2020-01-31T16:54:04+00:00
 * @Last modified by:   dylanlawless
 * @Last modified time: 2020-02-17T14:12:02+00:00
 */

 import React, {
     Component
 } from 'react';

 import axios from 'axios';

 import { Card, Form, Button} from 'react-bootstrap';
 import '../styles/forms.css';



 class Login extends Component {


     constructor(props) {
        super(props);

        this.state = {
          email: '',
          password: ''
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
          password: this.state.password
        }

        console.log(user);

        axios.post(process.env.REACT_APP_BACKENED + '/account/login', user)
          .then(res => {
            // save token in local storage
            localStorage.setItem('jwtToken', res.data.token);
            console.log(res.data);
            window.location = '/'
          })
          .catch((err) => {
            if(err.response.status === 401) {
              this.setState({ message: 'Login failed. Username or password not match' });
            }
          });
      };


     render() {
         return (

             <div className = "container" >
                 <div className="center-div col-6 submit-form">
                 <Card className="signin-card">
                      <Card.Body>
                        <Card.Title className="title-card">sign in.</Card.Title>

                         <Form onSubmit={this.onSubmit}>
                               <Form.Group>

                                <Form.Control className="form-input" type="email" placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                  />
                                                       </Form.Group>

                               <Form.Group>
                                <Form.Control className="form-input password-input" type="password" placeholder="Password"
                                      name="password"
                                      value={this.state.password}
                                      onChange={this.handleInputChange}
                                    />
                                                       </Form.Group>

                                      <Button variant="primary" className="nav-button form-button" type="submit">
                                       Forgotten password?
                                      </Button>
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

 export default Login;
