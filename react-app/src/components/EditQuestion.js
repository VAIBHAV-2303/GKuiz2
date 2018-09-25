import React, { Component } from 'react';
import './DeleteQuestion.css';

class EditQuestion extends Component {
  
  constructor() {
    super();
    this.state = {
      data: [],
	  questionKey: -1,
      formData: {},
	  submitted: false,
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handleQNChange = this.handleQNChange.bind(this);
    this.handleTChange = this.handleTChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleOp1Change = this.handleOp1Change.bind(this);
    this.handleOp2Change = this.handleOp2Change.bind(this);
    this.handleOp3Change = this.handleOp3Change.bind(this);
    this.handleAnsChange = this.handleAnsChange.bind(this);
    this.handleAns1Change = this.handleAns1Change.bind(this);
    this.handleAns2Change = this.handleAns2Change.bind(this);
    this.handleAns3Change = this.handleAns3Change.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8081/questions/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data, curQuestionId: -1}));
  }

   handleAns1Change(event) {
    this.state.formData.ans1 = event.target.value;
    this.setState({formData: this.state.formData});
  }
  handleAns2Change(event) {
    this.state.formData.ans2 = event.target.value;
  	this.setState({formData: this.state.formData});
  }
  handleAns3Change(event) {
    this.state.formData.ans3 = event.target.value;
  	this.setState({formData: this.state.formData});
  }
  handleQChange(event) {
    this.state.formData.question = event.target.value;
  	this.setState({formData: this.state.formData});
  }
  handleTChange(event) {
    this.state.formData.typeOf = event.target.value;
  	this.setState({formData: this.state.formData});
  }
  handleCChange(event) {
    this.state.formData.category = event.target.value;
  	this.setState({formData: this.state.formData});
  }
  handleOp1Change(event) {
    this.state.formData.option1 = event.target.value;
  	this.setState({formData: this.state.formData});
  }
  handleOp2Change(event) {
    this.state.formData.option2 = event.target.value;
  	this.setState({formData: this.state.formData});
  }
  handleOp3Change(event) {
    this.state.formData.option3 = event.target.value;	
  	this.setState({formData: this.state.formData});
  }
  handleAnsChange(event) {
    this.state.formData.ans = event.target.value;
  	this.setState({formData: this.state.formData});
  }
  handleQNChange(event) {
  	if(Number(event.target.value)<0){
  		document.getElementById("error").innerHTML = "Quiz number shoud be a positive number";
  	}
  	else{
  		this.state.formData.quizNumber = Number(event.target.value);
  		this.setState({formData: this.state.formData});
  	}
  }

  handleEdit(reqkey){
    this.setState({questionKey: reqkey});
    this.setState({formData: this.state.data[reqkey]}, () => {
	    if(this.state.data[reqkey].typeOf=="single"){
	    	var radios = document.getElementsByName("answer");
	    	radios[Number(this.state.data[reqkey].ans)-1].checked=true;
	     	radios = document.getElementsByName("typeOf");
	     	radios[0].checked=true;
	    }
	    else{
	    	document.getElementsByName("answer1")[0].checked=Boolean(Number(this.state.data[reqkey].ans1));
	    	document.getElementsByName("answer2")[0].checked=Boolean(Number(this.state.data[reqkey].ans2));
	    	document.getElementsByName("answer3")[0].checked=Boolean(Number(this.state.data[reqkey].ans3));
	    	radios = document.getElementsByName("typeOf");
	     	radios[1].checked=true;
	    }

	    if(this.state.data[reqkey].category=="movies"){
	    	radios = document.getElementsByName("category");
	     	radios[0].checked=true;
	    }
	    else{
	    	radios = document.getElementsByName("category");
	     	radios[1].checked=true;
	    }
    });
  }

  handleSubmit(event){
  	event.preventDefault();
  	fetch('http://localhost:8081/questions/' + this.state.data[this.state.questionKey].id, {
    	method: 'PUT',
   		body: JSON.stringify(this.state.formData),
    })
    .then(response => {
    	if(response.status >= 200 && response.status < 300){
        	this.setState({submitted: true});
      		console.log("Update successful");
      		window.location.reload('/EditQuestion');
    	}
    });
  }

  render() {
    var tempthis=this;
    if(this.state.questionKey!=-1){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Edit Question</h1>
          </header>
          <br/><br/>
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Question</label><input type="text" id="Q" className="form-control" value={this.state.formData.question} onChange={this.handleQChange}/>
              </div>
              <br/><br/>
              <div className="form-group">
                  <label>Single</label><input type="radio" name="typeOf" className="form-control" value="single" onChange={this.handleTChange}/>
                  <label>Multiple</label><input type="radio" name="typeOf" className="form-control" value="multiple" onChange={this.handleTChange}/>
              </div>
              <br/><br/>
              <div className="form-group">
                  <label>Movies</label><input type="radio" name="category" className="form-control" value="movies" onChange={this.handleCChange}/>
                  <label>Sports</label><input type="radio" name="category" className="form-control" value="sports" onChange={this.handleCChange}/>
              </div>
              <br/><br/>
              <div className="form-group">
                  <label>Quiz Number</label>
                  <input type="text" className="form-control" value={this.state.formData.quizNumber} onChange={this.handleQNChange}/>
              </div>
              <div id="error"></div>
              <br/><br/>
              <div className="form-group">
                  <label>option1</label>
                  <input type="text" className="form-control" value={this.state.formData.option1} onChange={this.handleOp1Change}/>
              </div>
              <div className="form-group">
                  <label>option2</label>
                  <input type="text" className="form-control" value={this.state.formData.option2} onChange={this.handleOp2Change}/>
              </div>
              <div className="form-group">
                  <label>option3</label>
                  <input type="text" className="form-control" value={this.state.formData.option3} onChange={this.handleOp3Change}/>
              </div>
              <br/><br/>
              <div id="options">
                <p>For single correct choose 1</p> 
                <div className="form-group">
                  <label>ans1</label><input type="radio" name="answer" className="form-control" value="1" onChange={this.handleAnsChange}/>
                  <label>ans2</label><input type="radio" name="answer" className="form-control" value="2" onChange={this.handleAnsChange}/>
                  <label>ans3</label><input type="radio" name="answer" className="form-control" value="3" onChange={this.handleAnsChange}/>
                </div>
                <br/><br/>
                <p>For multiple correct choose at least one</p>
                <div className="form-group">
                  <label>ans1</label><input type="checkbox" name="answer1" className="form-control" value="1" onChange={this.handleAns1Change}/>
                  <label>ans2</label><input type="checkbox" name="answer2" className="form-control" value="1" onChange={this.handleAns2Change}/>
                  <label>ans3</label><input type="checkbox" name="answer3" className="form-control" value="1" onChange={this.handleAns3Change}/>
                </div>
              </div>
                  <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>

          {this.state.submitted &&
            <div>
              <h2>
                Question successfully updated.
              </h2>
            </div>
          }

        </div>
      );  
    }
    else{
      return (
      <div className="App">
          <header className="App-header">
            <h1 className="App-title">Edit Question</h1>
          </header>

          <table className="table-hover">
            <thead>
              <tr>
                <th>Question</th>
                <th>Category</th>
                <th>Quiz Num</th>
                <th>Options</th>
                <th>Type</th>
                <th>Single answer</th>
                <th>Multiple answers</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
                 return (
                    <tr key = {key}>
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
                        <td>{item.typeOf}</td>
                        <td>{item.ans}</td>
                        <td>
                          <ul>
                            <li>Answer1: {item.ans1}</li>
                            <li>Answer2: {item.ans2}</li>
                            <li>Answer3: {item.ans3}</li>
                          </ul>
                        </td>
                        <td><button id={item.id} onClick={(e)=>tempthis.handleEdit(key)}>Edit</button></td>
                    </tr>
                  )
               })}
            </tbody>
         </table>
        </div>
      );
    }
  }
}

export default EditQuestion;
