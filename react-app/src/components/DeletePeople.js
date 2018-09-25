import React, { Component } from 'react';
import './DeletePeople.css';

class DeletePeople extends Component {
  
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8081/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  submit(event){
  	this.state.data.map(function(item, key) {
               if(document.getElementById(item.id)!=null && document.getElementById(item.id).checked){
               	fetch('http://localhost:8081/people/' + item.id, {
     				method: 'DELETE'
   				}).then(response => {
        		if(response.status >= 200 && response.status < 300){
         			console.log("great");
         			window.location.reload();
        		}
      			}
               );
             }
         }
         )
}

  render() {
  	return (
    <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete People</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Select to delete</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
            if(item.adminStatus!=1){             
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.city}</td>
                      <td><input type="radio" id={item.id}/></td>
                  </tr>
                )
            }
             })}
          </tbody>
       </table>
       <button type="submit" className="btn btn-default" onClick={(e) => this.submit(e)}>Submit</button>
      </div>
    );
  }
}

export default DeletePeople;
