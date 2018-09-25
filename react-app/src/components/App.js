import React, { Component } from 'react';
import DeleteQuestion from './DeleteQuestion';
import NewQuestion from './NewQuestion';
import ViewPeople from './ViewPeople';
import DeletePeople from './DeletePeople';
import Home from './Home';
import MovieQuiz from './MovieQuiz'
import SportsQuiz from './SportsQuiz'
import LeaderBoard from './LeaderBoard.js'
import Register from './Register.js'
import Login from './Login.js'
import Logout from './Logout.js'
import DeleteQuiz from './DeleteQuiz'
import EditQuestion from './EditQuestion'
import Page404 from './Page404'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    if(window.localStorage.getItem('currentUserFirstname')=='null'){
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>GKuiz2</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/Register'}>Register</Link></li>
                    <li><Link to={'/Login'}>Login</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                   <Route exact path='/' component={Home} />
                   <Route exact path='/Register' component={Register} />
                   <Route exact path='/Login' component={Login} />
                   <Route exact path='*' component={Page404} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
    else if(window.localStorage.getItem('currentUserAdminStatus')=="1"){
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>GKuiz2</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/NewQuestion'}>Create Question</Link></li>
                    <li><Link to={'/DeleteQuestion'}>Delete Question</Link></li>
                    <li><Link to={'/EditQuestion'}>Edit Question</Link></li>
                    <li><Link to={'/DeleteQuiz'}>Delete Quiz</Link></li>
                    <li><Link to={'/ViewPeople'}>View People</Link></li>
                    <li><Link to={'/DeletePeople'}>Delete People</Link></li>
                    <li><Link to={'/LeaderBoard'}>Leaderboard</Link></li>
                    <li><Link to={'/Logout'}>Logout</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                   <Route exact path='/' component={Home} />
                   <Route exact path='/NewQuestion' component={NewQuestion} />
                   <Route exact path='/DeleteQuestion' component={DeleteQuestion} />
                   <Route exact path='/EditQuestion' component={EditQuestion} />
                   <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                   <Route exact path='/ViewPeople' component={ViewPeople} />
                   <Route exact path='/DeletePeople' component={DeletePeople} />
                   <Route exact path='/LeaderBoard' component={LeaderBoard} />
                   <Route exact path='/Logout' component={Logout} />
                   <Route exact path='*' component={Page404} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
    else{
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>GKuiz2</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/ViewPeople'}>View People</Link></li>
                    <li><Link to={'/MovieQuiz'}>Movie Quiz</Link></li>
                    <li><Link to={'/SportsQuiz'}>Sports Quiz</Link></li>
                    <li><Link to={'/LeaderBoard'}>Leaderboard</Link></li>
                    <li><Link to={'/Logout'}>Logout</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                   <Route exact path='/' component={Home} />
                   <Route exact path='/ViewPeople' component={ViewPeople} />
                   <Route exact path='/MovieQuiz' component={MovieQuiz} />
                   <Route exact path='/SportsQuiz' component={SportsQuiz} />
                   <Route exact path='/LeaderBoard' component={LeaderBoard} />
                   <Route exact path='/Logout' component={Logout} />
                   <Route exact path='*' component={Page404} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
