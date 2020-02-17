/**
 * @Author: dylanlawless
 * @Date:   2020-01-22T17:31:59+00:00
 * @Last modified by:   dylanlawless
 * @Last modified time: 2020-02-17T00:47:52+00:00
 */

 import 'bootstrap/dist/css/bootstrap.min.css';


 import React from 'react';
 import './App.css';

 import MyNav from './Nav';
 import Home from './pages/Home';

 import Fixtures from './pages/fixtures/Fixtures';
 import EditFixture from './pages/fixtures/EditFixture';
 import CreateFixture from './pages/fixtures/CreateFixture';

 import ViewTeam from './pages/ViewTeam';
 import CreatePlayer from './pages/players/CreatePlayer';
 import ViewPlayer from './pages/players/ViewPlayer';
 import EditPlayer from './pages/players/EditPlayer';

 import Login from './auth/Login';
 import Register from './auth/Register';


 import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   Redirect
} from "react-router-dom";



class App extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            loggedIn: localStorage.getItem('jwtToken') !== null
        };
    }

    authHandler = () => {
        this.setState((state, props) => ({
            loggedIn: state.loggedIn ? false : true
        }));
    }

render(){


    const loggedIn = this.state.loggedIn;

    return(
     <Router>
         <MyNav  loggedIn={loggedIn} onLogout={this.authHandler} />
           <Switch>
             <Route exact path="/" component={Home} />

             <Route exact path="/viewTeam/:id" component={ViewTeam} />
             <Route exact path="/viewPlayer/:id" component={ViewPlayer} />
             <Route exact path="/fixtures" component={Fixtures} />

             <Route exact path="/editPlayer/:id" component={EditPlayer} />
              <Route exact path="/editFixture/:id" component={EditFixture} />
            <Route exact path="/createPlayer" >
                {loggedIn ? <CreatePlayer /> : <Redirect to="/login" />}
             </Route>
            <Route exact path="/createFixture" >
                {loggedIn ? <CreateFixture /> : <Redirect to="/login" />}
             </Route>

             <Route path="/login"  component={Login} />
             <Route path="/register"  component={Register} />




           </Switch>
     </Router>

   );
 }
}
 export default App;
