/**
 * @Author: dylanlawless
 * @Date:   2020-01-22T17:40:17+00:00
 * @Last modified by:   dylanlawless
 * @Last modified time: 2020-02-17T14:10:30+00:00
 */
 import React from 'react';
 import '../styles/home.css';
 import axios from 'axios';

 import { Card, Table, Button } from 'react-bootstrap';
 import { Link } from 'react-router-dom';


 /*  Team logos stored locally
 import Ireland from '../../images/Ireland.png';
 import Scotland from '../../images/Scotland.png';
 import Wales from '../../images/Wales.png';
 import France from '../../images/France.png';
 import Italy from '../../images/Italy.png';
 import England from '../../images/England.png';

*/

 class ViewTeam extends React.Component{

     constructor(props) {
  super(props);
            this.goBack = this.goBack.bind(this);
            this.state = {
            teams: [],
            players: [],
            loggedIn: localStorage.getItem('jwtToken') !== null
          };
        }

        deletePlayer(id) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')

        axios.delete(process.env.REACT_APP_BACKENED + '/players/' + id)
            .then((res) => {
                console.log('player successfully deleted!')
                this.setState({
                  players: this.state.players.filter(el => el._id !== id)
                })
            }).catch((error) => {
                console.log(error)
            })
          }

          goBack(){
              this.props.history.goBack();
          }

        componentDidMount() {
            const { id } = this.props.match.params;

            axios.get(process.env.REACT_APP_BACKENED + `/teams/${id}`)
                .then(response => {
                    console.log(response);
                    this.setState({
                        _id: response.data._id,
                        nation: response.data.nation,
                        coach: response.data.coach,
                        stadium: response.data.stadium,

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
                                {this.state.nation}
                          </h4>
                      </div>
                  </div>
              </div>

              <div className="view-team-div">
                    <Card className="col-sm-12 col-md-12 col-lg-12  team-card">
                        <Card.Body>

                          <div>
                              <div className="team-title">
                                  Coach:
                              </div>
                              <div>
                                  {this.state.coach}
                              </div>
                          </div>
                            <div>
                                <div className="team-title">
                                    Stadium:
                                </div>
                                <div>
                                    {this.state.stadium}
                                </div>
                            </div>

                            <div className="team-title">
                                Squad:
                            </div>
                <Table hover>

                <thead className="player-headings">
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Position</th>
                      <th>Points scored</th>
                      <th>Weight</th>
                      <th className="actions-heading">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="player-table-body">

                    {this.state.players.map((player) => {
                          if(player.team_id._id === this.state._id){
                            return(

                                    <tr className="player-row">

                                        <td>{player.name}</td>

                                        <td>{player.age}</td>

                                        <td>{player.position}</td>
                                        <td>{player.points_scored}</td>
                                        <td>{player.weight} kg</td>

                                        <td>
                                        <Link className=" player-link" to={`/viewPlayer/${player._id}`}>
                                            <Button className="action-button">
                                                    View
                                            </Button>
                                        </Link>


                                          {(loggedIn) ? (
                                              <div>
                                        <Link className=" player-link" to={`/editPlayer/${player._id}`}>
                                            <Button className="action-button">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button className="action-button" onClick={() => {
                                            if (window.confirm('Are you sure you wish to delete ' + (player.name) + ' from ' + (this.state.nation)))
                                            this.deletePlayer(player._id)}}>
                                            Delete
                                        </Button>
                                        </div>
                                      ) : (
                                          <>

                                          </>
                                      )}

                                        </td>
                                        </tr>
                            )
                        }

                        })}
                        </tbody>



                        </Table>
                          </Card.Body>
                          <Card.Footer className="text-muted">
                          {(loggedIn) ? (

                                  <Link className="create-button" to={`/createPlayer`}>
                                     <Button className="action-button">
                                        Create new player
                                     </Button>
                                 </Link>

                          ) : (
                              <>

                              </>
                          )}

                          <Button onClick={this.goBack} variant="primary" className="nav-button form-button">
                              Back
                          </Button>
                         </Card.Footer>


                       </Card>
                      </div>

          </div>
       </div>

     );

    }

 }

 export default ViewTeam;
