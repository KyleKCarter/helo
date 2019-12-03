import React, { Component } from 'react';
import {updateState, resetFields, registerUser, loginUser} from '../../redux/authReducer';
import {connect} from 'react-redux';

class Auth extends Component {
    state = {
        error: false
    }

    handleChange = e => {
        this.props.updateState({ [e.target.name]: e.target.value })
    }

    handleRegister = async(e) => {
        e.preventDefault();
        const {username, password} = this.props;
        await this.props.registerUser(
            username,
            password
        ).then(() => {
            this.props.loginUser(this.props.username, this.props.password)
            this.props.updateState({ loggedIn: true })
            this.props.history.push('/dashboard')
        }).catch(() => {
            this.setState({ error: true });
        })
    }

    clickLogin = e => {
        e.preventDefault();
        this.props.loginUser(this.props.username, this.props.password).then(() => {
            this.props.updateState({loggedIn: true})
            this.props.history.push('/dashboard');
        }).catch(() => {
            this.setState({ error: true});
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Helo</h1>
                    <div>
                        <h5>Username:</h5>
                        <input name='username' onChange={this.handleChange} />
                    </div>
                    <div>
                        <h5>Password:</h5>
                        <input name='password' onChange={this.handleChange} />
                    </div>
                    <div>
                        <button onClick={this.clickLogin}>Login</button>
                        <button onClick={this.handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.username,
        password: state.authReducer.password,
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {
    updateState,
    resetFields,
    registerUser,
    loginUser
})(Auth);