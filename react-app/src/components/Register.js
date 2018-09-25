import React, { Component } from 'react';
import './Home.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      formData: {
        firstname: "",
        lastname: "",
        city: "",
        password: "",
        totalScore: 0,
        movieScore: 0,
        sportsScore: 0,
        adminStatus: "0",
      },
      submitted: false,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
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

    if(this.state.formData.password.length<8){
      return 3;
    }

    var flag = 0
    var tempthis = this
    this.state.data.map(function(item, key) {
      if(item.firstname==tempthis.state.formData.firstname && item.lastname==tempthis.state.formData.lastname){
        console.log("pui");
        flag=1;
      }
    })
    if(flag==1){
      return 2;
    }
    else{
      return 1;
    }
  } 

  handleSubmit (event) {
    event.preventDefault();
    if(this.checkFn(event)==1){
    fetch('http://localhost:8081/people', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
      document.getElementById("verdict").innerHTML="Registration successful";
    }
    else if(this.checkFn(event)==2){
      document.getElementById("verdict").innerHTML="Such a user already exists!";
    }
    else{
      document.getElementById("verdict").innerHTML="Password too short"; 
    }
  }

  handleFChange(event) {
    this.state.formData.firstname = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.lastname = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.city = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Register a new user</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" id="FN" className="form-control" value={this.state.firstname} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" id="LN" className="form-control" value={this.state.lastname} onChange={this.handleLChange}/>
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" value={this.state.city} onChange={this.handleCChange}/>
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

export default Register;
