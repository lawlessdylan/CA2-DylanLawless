/**
 * @Author: dylanlawless
 * @Date:   2020-01-22T17:40:26+00:00
 * @Last modified by:   dylanlawless
 * @Last modified time: 2020-02-17T14:11:01+00:00
 */
 import '../../App.css';

  import React, {
      Component
  } from 'react';

  import axios from 'axios';

 import { Link } from 'react-router-dom';
  import { Card, Form, Col, Button} from 'react-bootstrap';
  import Moment from 'react-moment';
  import '../../styles/fixtures.css';


  class Fixtures extends React.Component{


           constructor(props) {
             super(props);

                this.state = {
                  fixtures: [],
                  teams: [],
                  loggedIn: localStorage.getItem('jwtToken') !== null


                };
              }

              deleteFixture(id) {
                  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')

              axios.delete(process.env.REACT_APP_BACKENED + '/fixtures/' + id)
                  .then((res) => {
                      console.log('Fixture successfully deleted!')
                      this.setState({
                        fixtures: this.state.fixtures.filter(el => el._id !== id)
                      })
                  }).catch((error) => {
                      console.log(error)
                  })
                }



              componentDidMount() {
                axios.get(process.env.REACT_APP_BACKENED + '/fixtures')
                .then(response => {
                  console.log(response);


                  this.setState({
                    fixtures: response.data
                  })
                })
                .catch((error) => {
                  console.log(error);
                })

                axios.get(process.env.REACT_APP_BACKENED + '/teams')
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





  render(){
      const loggedIn = this.state.loggedIn;

      return(

          <div className = "container" >
              <div className="center-div">
              <h4 className="small-title">
                 Fixtures.
              </h4>
                 <div className="text-animation">


                         {this.state.fixtures.map((fixture) =>
                             <div key={fixture._id}>


                                   <div className="fixture-div col-sm-12 col-md-12 col-lg-12">
                                 <Card className="col-md-12 col-lg-12  fixture-card">

                                      <Card.Body>
                                      <div className="row">
                                          <div className="fixture-date  col-2">
                                              Date:
                                              <Moment className="fixture-time" format="D MMM">{fixture.date}</Moment>
                                          </div>


                                          <div className=" col-sm-6 col-md-7 col-lg-7">

                                          <div className="row fixture-row">
                                            <div className="team-one-left">
                                                  {fixture.team_one_id.nation}
                                            </div>
                                                  <div className="fixture-numbers">
                                                    {fixture.result.team_one_score}
                                                   -
                                                    {fixture.result.team_two_score}
                                                  </div>
                                                  <div className="fixture-team-two">
                                                    {fixture.team_two_id.nation}
                                                  </div>
                                                </div>
                                               </div>
                                               <div className="fixture-actions col-3">

                                              {(loggedIn) ? (
                                                  <div>
                                                      <Link to={`/editFixture/${fixture._id}`}>
                                                          <Button  className="action-button">
                                                            Edit
                                                          </Button>
                                                      </Link>
                                                      <Button className="action-button" onClick={() => {
                                                          if (window.confirm('Are you sure you wish to delete this fixture?'))
                                                          this.deleteFixture(fixture._id)}}>Delete</Button>
                                                          </div>
                                                      ) : (
                                                          <></>
                                                      )}

                                                </div>

                                        </div>
                                      </Card.Body>

                                   </Card>
                                   </div>


                             </div>
                          )}

                 </div>
                 {(loggedIn) ? (
                         <Link className="create-button" to={`/createFixture`}>
                            <Button className="action-button">
                               Create new fixture
                            </Button>
                        </Link>
                    ) : (
                        <>

                        < />
                 )}


               </div>
         </div>



      );

  }


  }

  export default Fixtures;
