import React, { Component } from 'react';
import './DeleteQuestion.css';

class DeleteQuestion extends Component {
  
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8081/questions/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  submit(event){
    this.state.data.map(function(item, key) {
               if(document.getElementById(item.id).checked){
                fetch('http://localhost:8081/questions/' + item.id, {
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
          <h1 className="App-title">Delete Question</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Category</th>
              <th>Quiz Number</th>
              <th>Options</th>
              <th>Select to delete</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.question}</td>
                      <td>{item.category}</td>
                      <td>{item.quizNumber}</td>
                      <td>
                      	<ul>
                      		<li>{item.option1}</li>
                      		<li>{item.option2}</li>
                      		<li>{item.option3}</li>
                      	</ul>
                      </td>
                      <td><input type="radio" id={item.id}/></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       <button type="submit" className="btn btn-default" onClick={(e) => this.submit(e)}>Submit</button>
      </div>
    );
  }
}

export default DeleteQuestion;
