/**
 * @Author: dylanlawless
 * @Date:   2020-01-22T17:40:26+00:00
 * @Last modified by:   dylanlawless
 * @Last modified time: 2020-02-17T14:09:18+00:00
 */
 import '../../App.css';

import React, {
    Component
} from 'react';

import axios from 'axios';

import { Card, Form, Col, Button} from 'react-bootstrap';
import '../../styles/forms.css';





class EditPlayer extends React.Component{


    constructor(props) {
       super(props);

       this.goBack = this.goBack.bind(this);
       this.state = {
         name: '',
         age: '',
         weight: '',
         position: '',
         points_scored: '',
         team_id: {
             nation: ''
         },
         teams: [{
             _id: '',
             nation: ''
         }]

       };

     }


     componentDidMount() {

       const { id } = this.props.match.params;

       axios.get(process.env.REACT_APP_BACKENED + `/players/${id}`)
           .then(response => {
               console.log(response);
               this.setState({
                   _id: response.data._id,
                   name: response.data.name,
                   age: response.data.age,
                   weight: response.data.weight,
                   points_scored: response.data.points_scored,
                   position: response.data.position,
                   team_id: response.data.team_id,


                   loading: false
               })
           })
       .catch((error) => {
         console.log(error);
       })

       axios.get(process.env.REACT_APP_BACKENED + `/teams`)
           .then(response => {
               console.log(response);
               this.setState({
                  teams: response.data

               })
           })
       .catch((error) => {
         console.log(error);
       })


     }

     goBack(){
         this.props.history.goBack();
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

       const player = {
         name: this.state.name,
         age: this.state.age,
         weight: this.state.weight,
         position: this.state.position,
         points_scored: this.state.points_scored,
         team_id: this.state.team_id

     }
           const { id } = this.props.match.params;
           axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
           axios.put(process.env.REACT_APP_BACKENED + `/players/${id}`, player)
             .then(res => {
               // save token in local storage
               console.log(res.data);
               window.location = '/'
             })

         .catch(err => console.log(err));

     };


render(){



    return(
        <div className = "container" >
            <div className="center-div">
            <Card className="create-player-card">
                 <Card.Body>
                   <Card.Title className="title-card">edit player.</Card.Title>

                           <Form onSubmit={this.onSubmit}>
                           <Form.Row>
                           <Col>
                               <Form.Group>
                               <Form.Control className="form-input" type="text" placeholder="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                              />
                              </Form.Group>
                             </Col>
                             <Col lg="4">
                               <Form.Group>
                               <Form.Control className="form-input" type="number" placeholder="Age"
                                  name="age"
                                  value={this.state.age}
                                  onChange={this.handleInputChange}
                                />
                                </Form.Group>
                               </Col>
                            </Form.Row>

                            <Form.Row>
                            <Col>
                           <Form.Group>
                               <Form.Control className="form-input" type="number" placeholder="Weight (kg)"
                                name="weight"
                                value={this.state.weight}

                               onChange={this.handleInputChange}
                              />
                          </Form.Group>
                          </Col>
                          <Col>
                           <Form.Group>
                           <Form.Label className="dropdown-create">Position</Form.Label>

                           <Form.Control className="position-dropdown" as="select" value={this.state.position} name="position" onChange={this.handleInputChange}>


                             <option value="Prop">Prop</option>
                             <option value="Hooker">Hooker</option>
                             <option value="Second Row">Second Row</option>
                             <option value="Flanker">Flanker</option>
                             <option value="No. 8">No. 8</option>
                             <option value="Scrum half">Scrum half</option>
                             <option value="Fly half">Fly half</option>
                             <option value="Centre">Centre</option>
                             <option value="Wing">Wing</option>
                             <option value="Full back">Full back</option>

                           </Form.Control>
                            </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Group>
                            <Form.Control className="form-input" type="number" placeholder="Points scored"
                             name="points_scored"
                             value={this.state.points_scored}

                            onChange={this.handleInputChange}
                           />
                       </Form.Group>


                               <Form.Row>
                               <Col>

                               <Form.Label>Team</Form.Label>
                                 <Form.Control as="select" name="team_id" value={this.state.team_id.nation} onChange={this.handleInputChange}>
                                     <option hidden="hidden">{this.state.team_id.nation}</option>
                                          {this.state.teams.map((team) => {
                                              return(
                                                <option value={team._id}>{team.nation}</option>
                                              )
                                          })}

                                  </Form.Control>

                                  </Col>

                               </Form.Row>

                                        <Button onClick={this.goBack} variant="primary" className="nav-button form-button">
                                            Cancel
                                        </Button>
                                         <Button variant="primary" className="nav-button button-submit" type="submit">
                                          Edit Player
                                         </Button>

                                 </Form>
                                 </Card.Body>
                               </Card>

                            </div>

                        </div>
    );

}


}

export default EditPlayer;
