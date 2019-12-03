import React from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import Auth from './components/auth/Auth';
import Dashboard from './components/dashboard/Dashboard';
import Form from './components/form/Form';
import Post from './components/post/Post';

export default (
    <Switch>
        <Route component={Auth} exact path='/' />
        <Route component={Dashboard} path='/dashboard' />
        <Route component={Form} path='/new' />
        <Route component={Post} path='/post/:postid' />
    </Switch>
)