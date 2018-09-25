
import React, { Component } from 'react';
import './ViewPeople.css';

class LeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event){
    var reqfilter = document.getElementById("filter").value;
    this.setState({data: this.state.data.sort(function(a,b) {return (a[reqfilter] > b[reqfilter]) ? -1 : ((b[reqfilter] > a[reqfilter]) ? 1 : 0);} ) });
    console.log(this.state.data);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8081/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => {this.setState({data: data});
                       this.setState({data: this.state.data.sort(function(a,b) {return (a.totalScore > b.totalScore) ? -1 : ((b.totalScore > a.totalScore) ? 1 : 0);} ) });
      });


  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leader Board</h1>
        </header>

        
      <b>Select Category:</b> <select id="filter"> 
        <option value="totalScore" onClick={(e)=>this.handleFilter(e)}>Overall</option>
        <option value="movieScore" onClick={(e)=>this.handleFilter(e)}>Movies</option>
        <option value="sportsScore" onClick={(e)=>this.handleFilter(e)}>Sports</option>
      </select>   
      <br/>
      <br/>

        <table className="table-hover">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Total Score</th>
              <th>Movies Score</th>
              <th>Sports Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
          	if(item.adminStatus!=1){
               return (
                  <tr key = {key}>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.city}</td>
                      <td>{item.totalScore}</td>
                      <td>{item.movieScore}</td>
                      <td>{item.sportsScore}</td>
                  </tr>
                )
          	}
             })}
          </tbody>
       </table> 
      </div>
    );
  }
}

export default LeaderBoard;
