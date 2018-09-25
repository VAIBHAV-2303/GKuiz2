import React, { Component } from 'react';
import './NewQuestion.css';

class NewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        question: "",
        typeOf: "",
        quizNumber: 0,
        category: "",
        option1: "",
        option2: "",
        option3: "",
        ans: "0",
        ans1: "0",
        ans2: "0",
        ans3: "0",
      },
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {

    event.preventDefault();
    console.log(this.state.formData);
    fetch('http://localhost:8081/questions', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
          console.log("Question created");
      });
  }

  handleAns1Change(event) {
    this.state.formData.ans1 = event.target.value;
  }
  handleAns2Change(event) {
    this.state.formData.ans2 = event.target.value;
  }
  handleAns3Change(event) {
    this.state.formData.ans3 = event.target.value;
  }
  handleQChange(event) {
    this.state.formData.question = event.target.value;
  }
  handleTChange(event) {
    this.state.formData.typeOf = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.category = event.target.value;
  }
  handleOp1Change(event) {
    this.state.formData.option1 = event.target.value;
  }
  handleOp2Change(event) {
    this.state.formData.option2 = event.target.value;
  }
  handleOp3Change(event) {
    this.state.formData.option3 = event.target.value;
  }
  handleAnsChange(event) {
    this.state.formData.ans = event.target.value;
  }
  handleQNChange(event) {
  	if(Number(event.target.value)<=0){
  		document.getElementById("error").innerHTML = "Quiz number shoud be a positive number";
  	}
  	this.state.formData.quizNumber = Number(event.target.value);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question</label><input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange}/>
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
                <input type="text" className="form-control" value={this.state.quizNumber} onChange={this.handleQNChange}/>
            </div>
            <div id="error"></div>
            <br/><br/>
            <div className="form-group">
                <label>option1</label>
                <input type="text" className="form-control" value={this.state.option1} onChange={this.handleOp1Change}/>
            </div>
            <div className="form-group">
                <label>option2</label>
                <input type="text" className="form-control" value={this.state.option2} onChange={this.handleOp2Change}/>
            </div>
            <div className="form-group">
                <label>option3</label>
                <input type="text" className="form-control" value={this.state.option3} onChange={this.handleOp3Change}/>
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
              New Question successfully added.
            </h2>
          </div>
        }

      </div>
    );
  }
}

export default NewQuestion;
