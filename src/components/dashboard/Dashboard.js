import React, { Component } from 'react';

import Nav from '../nav/Nav';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <>
            <Nav />
            <div>Dashboard</div>
            </>
        )
    }
}

export default Dashboard;