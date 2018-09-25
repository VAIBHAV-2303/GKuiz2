import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
  render() {
  	var styles = {
  		Fontsize: 40
  	};
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to GKuiz(This time on react)</h1>
        </header>

        <br/><br/><br/><br/><br/><br/>

        <p style={styles}>
        	<b><i>"The true sign of intelligence is not knowledge but imagination"</i></b>
        </p>

      </div>
    );
  }
}

export default Home;
