/**
 * @Author: dylanlawless
 * @Date:   2020-01-22T17:40:17+00:00
 * @Last modified by:   dylanlawless
 * @Last modified time: 2020-02-17T14:09:47+00:00
 */
 import React from 'react';
 import '../../styles/home.css';
 import axios from 'axios';


 import { Card, Table, Button} from 'react-bootstrap';
 import { Link } from 'react-router-dom';

 class ViewTeam extends React.Component{

     constructor(props) {
  super(props);
            this.goBack = this.goBack.bind(this);
          this.state = {
            players: [],
            teams: [],
            loggedIn: localStorage.getItem('jwtToken') !== null

          };
        }

        goBack(){
            this.props.history.goBack();
        }

        deletePlayer(id) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
        axios.delete(process.env.REACT_APP_BACKENED + '/players/' + id)
            .then((res) => {
                console.log('player successfully deleted!')
                window.location = '/'

            }).catch((error) => {
                console.log(error)
            })
          }

        componentDidMount() {
            const { id } = this.props.match.params;

            axios.get(process.env.REACT_APP_BACKENED + `/players/${id}`)
                .then(response => {
                    console.log(response);
                    this.setState({
                        _id: response.data._id,
                        name: response.data.name,
                        weight: response.data.weight,
                        position: response.data.position,
                        points_scored: response.data.points_scored,
                        age: response.data.age,
                        loading: false
                    })
                })
            .catch((error) => {
              console.log(error);
            })

          axios.get(process.env.REACT_APP_BACKENED + '/players')
          .then(response => {
            console.log(response);
            this.setState({
              players: response.data

            })
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
        }


 render(){
     const loggedIn = this.state.loggedIn;

     return(

       <div className="main-div">
          <div className="container">
              <div className="row">
                  <div className="col-12">
                      <div className="title-animation">
                          <h4 className="small-title">
                                    View player
                          </h4>
                      </div>
                  </div>
              </div>

                <div className="team_div">
                    <Card className="col-md-6 team-card">
                        <Card.Body>

                         <Card.Title className="team-title">

                           {this.state.name}
                          </Card.Title>
                          <div>
                                Weight: {this.state.weight} kg

                            </div>

                            <div>
                                Position: {this.state.position}


                            </div>
                            <div>
                                Points scored: {this.state.points_scored}

                            </div>
                            <div>
                                Age: {this.state.age}

                            </div>


                          </Card.Body>
                          <Card.Footer className="text-muted">
                           {(loggedIn) ? (
                              <div>
                              <Link className="create-button" to={`/editPlayer/${this.state._id}`}>
                                <Button  className="action-button" >
                                  Edit
                                 </Button>
                                </Link>


                              <Button className="action-button" onClick={() => {
                                  if (window.confirm('Are you sure you wish to delete ' + (this.state.name) ))
                                  this.deletePlayer(this.state._id)}}>Delete
                                  </Button>
                                  </div>
                              ):(
                                    <></>
                              )}

                              <Link >
                                <Button onClick={this.goBack} className="back-button">
                                    Back
                                </Button>
                                </Link>
                          </Card.Footer>
                       </Card>
                      </div>

          </div>
       </div>

     );

    }

 }

 export default ViewTeam;
