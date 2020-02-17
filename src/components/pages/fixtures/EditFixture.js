/**
 * @Author: dylanlawless
 * @Date:   2020-01-22T17:40:26+00:00
 * @Last modified by:   dylanlawless
 * @Last modified time: 2020-02-17T14:11:26+00:00
 */
 import '../../App.css';

import React, {
    Component
} from 'react';

import axios from 'axios';

import { Card, Form, Col, Button} from 'react-bootstrap';
import '../../styles/forms.css';





class EditFixture extends React.Component{


    constructor(props) {
       super(props);

       this.goBack = this.goBack.bind(this);

       this.onSubmit = this.onSubmit.bind(this);
       this.handleInputChange = this.handleInputChange.bind(this);

           this.state = {
           date: '',
             team_one_id: {
               nation: ''
             },
             team_two_id: {
               nation: ''
             },
             team_one_score: '',
             team_two_score: '',

             teams: [{
               _id: '',
               nation: ''
             }]

       }
}







     componentDidMount() {

       const { id } = this.props.match.params;

       axios.get(process.env.REACT_APP_BACKENED + `/fixtures/${id}`)
           .then(response => {
               console.log(response);
               this.setState({
                   date: response.data.date,
                   team_one_id: response.data.team_one_id,
                   team_two_id: response.data.team_two_id,
                   team_one_score: response.data.result.team_one_score,
                   team_two_score: response.data.result.team_two_score,


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

     onChangeDate(date) {
         this.setState({
             date: this.state.date
       });
   };

     onSubmit = e => {
       e.preventDefault();

       const fixture = {
         date: this.state.date,
         team_one_id: this.state.team_one_id,
         team_two_id: this.state.team_two_id,
         result: {
               team_one_score: this.state.team_one_score,
               team_two_score: this.state.team_two_score

         }
     }
       const { id } = this.props.match.params;
       axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
       axios.put(process.env.REACT_APP_BACKENED + `/fixtures/${id}`, fixture)
         .then(res => {
           // save token in local storage
           console.log(res.data);
           window.location = '/'
         })

         .catch(err => console.log(err));

     };


render(){



    return(
      <div className="main-div">
        <div className = "container" >
            <div className="center-div">
            <Card className="create-card">
                 <Card.Body>
                   <Card.Title className="title-card">edit fixture.</Card.Title>

                           <Form onSubmit={this.onSubmit}>

                                 <Form.Group>
                                 <Form.Control className="form-input" type="date" placeholder="date"
                                     name="date"
                                     value={this.state.date}
                                     onChange={this.handleInputChange}
                                   />
                               </Form.Group>

                               <Form.Row>

                               <Col>
                                   <Form.Label>Team one</Form.Label>
                                   <Form.Control as="select" name="team_one_id" value={this.state.team_one_id.nation} onChange={this.handleInputChange}>
                                      <option hidden="hidden">{this.state.team_one_id.nation}</option>
                                          {this.state.teams.map((team) => {

                                              return(
                                                <option value={team._id}>{team.nation}</option>
                                              )

                                          })}

                                      </Form.Control>
                                  </Col>
                                  vs.
                                  <Col>

                                      <Form.Label>Team two</Form.Label>
                                        <Form.Control as="select" name="team_two_id" value={this.state.team_two_id.nation} onChange={this.handleInputChange}>
                                            <option hidden="hidden">{this.state.team_two_id.nation}</option>
                                                 {this.state.teams.map((team) => {
                                                     return(
                                                       <option value={team._id}>{team.nation}</option>
                                                     )
                                                 })}

                                         </Form.Control>
                                     </Col>
                               </Form.Row>


                               <Form.Group>
                                <Form.Control className="form-input" type="text" placeholder="team one result"
                                   value = {this.state.team_one_score}
                                    name="team_one_score"
                                   onChange={this.handleInputChange}
                                  />
                             </Form.Group>


                             <Form.Group>
                              <Form.Control className="form-input" type="text" placeholder="team two result"
                                   value = {this.state.team_two_score}
                                  name="team_two_score"
                                  onChange={this.handleInputChange}
                                />
                                </Form.Group>

                                        <Button onClick={this.goBack} variant="primary" className="nav-button form-button">
                                            Cancel
                                        </Button>
                                         <Button variant="primary" className="nav-button button-submit" type="submit">
                                           Edit
                                         </Button>

                                 </Form>

                                 </Card.Body>
                               </Card>

                            </div>

                        </div>

                  </div>

    );

}


}

export default EditFixture;
