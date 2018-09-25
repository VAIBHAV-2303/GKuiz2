import React, { Component } from 'react';
import './DeleteQuestion.css';

class DeleteQuiz extends Component {
  
  constructor() {
    super();
    this.state = {
      data: [],
      curQuizNumber: 0,
      numberOfQuizzes: new Array(100),
      curCategory: "",
    }
    this.state.numberOfQuizzes.fill(0);
    this.handleFilter = this.handleFilter.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var tempthis=this;
    const request = new Request('http://127.0.0.1:8081/questions/');
    fetch(request)
      .then(response => response.json())
        .then(data => { this.setState({data: data});
      });
  }

  handleFilter(event) {
    this.state.numberOfQuizzes.fill(0);
    var tempthis = this;
    var reqfilter = document.getElementById("filter").value;
    this.state.data.map(function(item, key) {
        if(item.category==reqfilter){ 
          tempthis.state.numberOfQuizzes[item.quizNumber]=1;
        }
    });
    this.setState({curCategory: reqfilter});
 }

  submit(event){
    var tempthis=this;
    this.state.numberOfQuizzes.map(function(item, key){
      if(item==1){
      	console.log('pui');
        if(document.getElementById(key).checked){
          tempthis.state.data.map(function(item2, key2){
            if(item2.category==tempthis.state.curCategory && item2.quizNumber==key){
              fetch('http://localhost:8081/questions/' + item2.id, {
                      method: 'DELETE'
                      }).then(response => {
                          if(response.status >= 200 && response.status < 300){
                              console.log("great");
                              window.location.reload();
                          } 
                        });
              }
          })
        }
      }
    })
}

  render() {
    var tempthis = this; 
    return (
    <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete Quiz</h1>
        </header>

        <div>
            <b>Select Category:</b><select id="filter">
              <option value='null'>Not selected</option>
              <option value='movies' onClick={(e) => this.handleFilter(e)}>Movie</option>
              <option value='sports' onClick={(e) => this.handleFilter(e)}>Sports</option>
           </select>
          </div> 

        <table className="table-hover">
          <thead>
            <tr>
              <th>Quiz Number</th>
              <th>Select to delete</th>
            </tr>
          </thead>
          <tbody>{tempthis.state.numberOfQuizzes.map(function(item, key) {
                if(item==1){ 
                    return (
                      <tr key = {key}>
                          <td>{"quiz"+key}</td>
                          <td><input id={key} type="radio"/></td>
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

export default DeleteQuiz;
