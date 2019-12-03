import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from './../../redux/authReducer';

class Nav extends Component {
    
    logout = () => {
        this.props.logoutUser().then(() => {
            this.props.history.push('/');
        })
    }

    render() {
        return (
            <button onClick={this.logout}>Log Out</button>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

export default withRouter(connect(mapStateToProps, {
    logoutUser
})(Nav));