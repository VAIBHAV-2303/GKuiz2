import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Logout extends Component {
	render(){
		window.localStorage.setItem('currentUserId', 'null');
        window.localStorage.setItem('currentUserFirstname', 'null');
        window.localStorage.setItem('currentUserLastname', 'null');
        window.localStorage.setItem('currentUserCity', 'null');
        window.localStorage.setItem('currentUserAdminStatus', 'null');
        window.localStorage.setItem('currentUserTotalScore', 'null');
        window.localStorage.setItem('currentUserMovieScore', 'null');
        window.localStorage.setItem('currentUserSportsScore', 'null');
		return window.location.replace('/');
	}
}

export default Logout;