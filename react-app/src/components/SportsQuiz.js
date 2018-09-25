import React, { Component } from 'react';
import './MovieQuiz.css';

class SportsQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      attemptedData: [],
      formData: {
        firstname: window.localStorage.getItem('currentUserFirstname'),
        lastname: window.localStorage.getItem('currentUserLastname'),
        city: window.localStorage.getItem('currentUserCity'),
        password: window.localStorage.getItem('currentUserPassword'),
        totalScore: Number(window.localStorage.getItem('currentUserTotalScore')),
        movieScore: Number(window.localStorage.getItem('currentUserMovieScore')),
        sportsScore: Number(window.localStorage.getItem('currentUserSportsScore')),
        adminStatus: window.localStorage.getItem('currentUserAdminStatus'),
      },
      formData2: {
      	personId: Number(window.localStorage.getItem('currentUserId')),
      	category: "sports",
      	quizNumber: 0,
      	score: 0, 
      },
      submitted: false,
      correct: 0,
      incorrect: 0,
      alreadyAttempted: 0,
      numberOfQuizzes: new Array(100),
      curQuizNumber: 0,
      prevScore: 0,
    }
    this.state.numberOfQuizzes.fill(0);
  	this.handleSubmit = this.handleSubmit.bind(this);
  	this.getRadioVal = this.getRadioVal.bind(this);
  	this.handleFilter = this.handleFilter.bind(this);
  	this.handleLifeline = this.handleLifeline.bind(this);
  }

  componentDidMount() {
  	var tempthis=this;
    const request = new Request('http://127.0.0.1:8081/questions/');
    fetch(request)
      .then(response => response.json())
        .then(data => { this.setState({data: data});
                        this.state.data.map(function(item, key) {
                          if(item.category=="sports"){ 
                            tempthis.state.numberOfQuizzes[item.quizNumber]=1;
                          }
                        });
                        this.setState({numberOfQuizzes: this.state.numberOfQuizzes});
      });
    const request2 = new Request('http://127.0.0.1:8081/attempted/');
    fetch(request2)
      .then(response => response.json())
        .then(attemptedData => { this.setState({attemptedData: attemptedData});
      });
  }

  handleFilter(event) {
  	this.state.correct = 0;
  	this.state.incorrect = 0;
  	this.state.alreadyAttempted = 0;
    document.getElementById("results").innerHTML="";
    document.getElementById("sub").disabled=false;

  	var tempthis = this;

  	var reqfilter = Number(document.getElementById("filter").value);

  	this.state.attemptedData.map(function(item,  key){
  		if(item.personId==Number(window.localStorage.getItem('currentUserId'))){
  			if(item.category=="sports"){
  				if(item.quizNumber==reqfilter){
  					tempthis.state.alreadyAttempted = 1;
  					tempthis.state.prevScore = item.score;
  				}
  			}
  		}
  	})
  	this.setState({curQuizNumber: reqfilter});
  	if(this.state.alreadyAttempted==1){
  		document.getElementById("results").innerHTML="Previous Score: " + this.state.prevScore;
  		document.getElementById("sub").disabled=true;	
  	}
 }

  getRadioVal(reqid) {
  	var radios = document.getElementsByName(reqid);
  	var i;
  	for(i=0;i<3;i++){
  		if(radios[i].checked){
  			return radios[i].value; 
  		}
  	}
  	return "0";
  }

  handleSubmit(event){
  	var tempthis = this
  	this.state.data.map(function(item, key) {
  		if(item.category=="sports" && item.quizNumber==tempthis.state.curQuizNumber){
  			if(item.typeOf=="single"){
  				if(tempthis.getRadioVal("selectedAnswer"+item.id)==item.ans){
  					tempthis.state.correct+=1;
  					tempthis.state.formData.sportsScore+=1;
  					tempthis.state.formData.totalScore+=1;
  				}
  				else{
  					tempthis.state.incorrect+=1;
  				}
  			}
  			else{
  				if(Number(document.getElementById("selectedAnswer1"+item.id).checked)==Number(item.ans1) && Number(document.getElementById("selectedAnswer2"+item.id).checked)==Number(item.ans2) && Number(document.getElementById("selectedAnswer3"+item.id).checked)==Number(item.ans3)){
  					tempthis.state.correct+=1;
  					tempthis.state.formData.sportsScore+=1;
  					tempthis.state.formData.totalScore+=1;
  				}
  				else{
  					tempthis.state.incorrect+=1;
  				}
  			}
  		}
  	});
    document.getElementById("results").innerHTML="Correct: "+this.state.correct+"\n"+", Incorrect or unattempted: "+this.state.incorrect+"\n";
    window.localStorage.setItem('currentUserSportsScore', this.state.formData.sportsScore.toString());
    window.localStorage.setItem('currentUserTotalScore', this.state.formData.totalScore.toString());

    fetch('http://localhost:8081/people/' + window.localStorage.getItem('currentUserId'), {
    	method: 'PUT',
   		body: JSON.stringify(this.state.formData),
    })
    .then(response => {
    	if(response.status >= 200 && response.status < 300){
        	this.setState({submitted: true});
      		console.log("Update successful");
    	}
    });

    this.state.formData2.score=this.state.correct;
    this.state.formData2.quizNumber=this.state.curQuizNumber; 

    fetch('http://localhost:8081/attempted', {
     method: 'POST',
     body: JSON.stringify(this.state.formData2),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });


    document.getElementById("sub").disabled=true;	

  }

  handleLifeline(reqkey){
    var reqid = this.state.data[reqkey].id;
    if(this.state.data[reqkey].typeOf=="single"){
      var rbts = document.getElementsByName("selectedAnswer"+reqid);
      rbts[Number(this.state.data[reqkey].ans)-1].checked=true;
    }
    else{
      document.getElementById("selectedAnswer1"+reqid).checked=Boolean(Number(this.state.data[reqkey].ans1));
      document.getElementById("selectedAnswer2"+reqid).checked=Boolean(Number(this.state.data[reqkey].ans2));
      document.getElementById("selectedAnswer3"+reqid).checked=Boolean(Number(this.state.data[reqkey].ans3));
    }

    var lbts = document.getElementsByName("lbt");
    for(var i=0;i<lbts.length;i++){
      lbts[i].disabled = true;
    }
  }

  render() {
  	var tempthis=this;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Answer Sports questions</h1>
        </header>

          <div>
            <b>Select Quiz Number: </b><select id="filter">
            	<option value='null'>Not selected</option>
            { this.state.numberOfQuizzes.map(function (item, key){
              if(item==1){ 
                return(
                  <option value={key.toString()} onClick={(e)=>tempthis.handleFilter(e)}>{"quiz"+key}</option>
                )
              }
                })
              }
           </select>
          </div> 
          <div>
          	{this.state.data.map(function(item, key){
		if(item.category=="sports"){
			if(item.quizNumber==tempthis.state.curQuizNumber){	
				if(item.typeOf=="single"){	
				return (
						<div key = {key}>
							<p>{item.question}</p><br/>
							A. <input type="radio" name={"selectedAnswer"+item.id} value="1"/>{item.option1}<br/>
							B. <input type="radio" name={"selectedAnswer"+item.id} value="2"/>{item.option2}<br/>
							C. <input type="radio" name={"selectedAnswer"+item.id} value="3"/>{item.option3}<br/>
              <button name="lbt" onClick={(e)=>tempthis.handleLifeline(key)}>Lifeline</button>
						<br/><hr/>
					</div>
					)
				}
				else{
					return (
						<div key = {key}>
							<p>{item.question}</p><br/>
							A. <input type="checkbox" id={"selectedAnswer1"+item.id} name="selectedAnswer1" value="1"/>{item.option1}<br/>
							B. <input type="checkbox" id={"selectedAnswer2"+item.id} name="selectedAnswer2" value="1"/>{item.option2}<br/>
							C. <input type="checkbox" id={"selectedAnswer3"+item.id} name="selectedAnswer3" value="1"/>{item.option3}<br/>
              <button name="lbt" onClick={(e)=>tempthis.handleLifeline(key)}>Lifeline</button>
						<br/><hr/>
					</div>
					)
				}
			}
		}
			})}
          </div>
          <br/><br/>
          	<button type="submit" id="sub" className="btn btn-default" onClick={(e)=>this.handleSubmit(e)}>Submit answers</button>
          <br/><br/>
            <div id="results"></div>
      </div>
    );
  }
}

export default SportsQuiz;
