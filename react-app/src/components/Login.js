import React, { Component } from 'react';
import './Home.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      formData: {
        firstname: "",
        lastname: "",
        password: "",
      },
      submitted: false,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFn = this.checkFn.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8081/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  checkFn(event) {
    var flag = 0
    var tempthis = this
    this.state.data.map(function(item, key) {
      if(item.firstname==tempthis.state.formData.firstname && item.lastname==tempthis.state.formData.lastname && item.password==tempthis.state.formData.password){
        window.localStorage.setItem('currentUserId', item.id);
        window.localStorage.setItem('currentUserFirstname', item.firstname);
        window.localStorage.setItem('currentUserLastname', item.lastname);
        window.localStorage.setItem('currentUserCity', item.city);
        window.localStorage.setItem('currentUserAdminStatus', item.adminStatus);
        window.localStorage.setItem('currentUserTotalScore', item.totalScore.toString());
        window.localStorage.setItem('currentUserMovieScore', item.movieScore.toString());
        window.localStorage.setItem('currentUserSportsScore', item.sportsScore.toString());
        window.localStorage.setItem('currentUserPassword', item.password);
        flag=1;
      }
    })
    if(flag==1){
      return true;
    }
    else{
      return false;
    }
  } 

  handleSubmit (event) {
    event.preventDefault();
    if(this.checkFn(event)){
      document.getElementById("verdict").innerHTML="Login successful";
      window.location.replace('/');
    }
    else{
      document.getElementById("verdict").innerHTML="Incorrect password or username";
    }
  }

  handleFChange(event) {
    this.state.formData.firstname = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.lastname = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">User login</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" value={this.state.firstname} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" value={this.state.lastname} onChange={this.handleLChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        <p id="verdict"></p>
      </div>
    );
  }
}

export default Login;
