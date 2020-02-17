/**
 * @Author: dylanlawless
 * @Date:   2020-01-22T17:40:17+00:00
 * @Last modified by:   dylanlawless
 * @Last modified time: 2020-02-17T14:10:05+00:00
 */
 import React from 'react';
 import '../styles/home.css';
 import axios from 'axios';

 import { Card, Button } from 'react-bootstrap';
 import { Link } from 'react-router-dom';



 class Home extends React.Component{

     constructor(props) {
  super(props);

          this.state = {
            teams: [],
            players: []
          };
        }

        componentDidMount() {
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
     return(
       <div className="main-div">
          <div className="container">
              <div className="row">
                  <div className="col-12">
                      <div className="title-animation">
                          <h4 className="home-title">
                              Six Nations

                          </h4>
                      </div>
                  </div>
              </div>

               {this.state.teams.map((team) => {
                 if(team._id != null){
                 return(
                <div className="team-div col-md-4">
                    <Card className="col-md-12 team-card">
                        <Card.Body>

                         <Card.Title className="team-title">

                           {team.nation}
                          </Card.Title>
                          <div>
                                Coach:    {team.coach}

                            </div>
                            <div>
                                Stadium: {team.stadium}

                            </div>



                          </Card.Body>
                          <Card.Footer className="text-muted">
                          <Link to={`/viewTeam/${team._id}`}>
                              <Button  className="action-button">
                                See more
                              </Button>
                          </Link>                          </Card.Footer>
                       </Card>
                   </div>
                 )}


               })}


          </div>
       </div>

     );

    }

 }

 export default Home;
