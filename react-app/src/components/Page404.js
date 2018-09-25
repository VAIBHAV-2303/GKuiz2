import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Page404 extends Component {
  render() {
    return (
        <div>
          <b>Invalid URL</b>
        </div>
      );
  }
}

export default Page404;
