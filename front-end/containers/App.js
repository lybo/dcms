import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Router } from 'redux-router-director'
import Login from './Login'
import Dashboard from './Dashboard'
import Users from './Users'
import UserForm from './UserForm'
import Profile from './Profile'
import Pages from './Pages'
import PageForm from './PageForm'
import Templates from './Templates'
import TemplateForm from './TemplateForm'
import FileManager from './FileManager'
import { auth } from '../middlewares/index'

const RoutePages = ({
    router
}) => {
    return (
        <div>
            <Router pattern="/develop" >
                <FileManager />
            </Router>
            <Router pattern="/login" >
                <Login />
            </Router>
            <Router pattern="" middlewares={[auth]}>
                <Login />
            </Router>
            <Router pattern="/" middlewares={[auth]}>
                <Dashboard />
            </Router>
            <Router pattern="/dashboard" middlewares={[auth]}>
                <Dashboard />
            </Router>
            <Router pattern="/users" middlewares={[auth]}>
                <Users />
            </Router>
            <Router pattern="/users/:userId" middlewares={[auth]}>
                <UserForm />
            </Router>
            <Router pattern="/profile" middlewares={[auth]}>
                <Profile />
            </Router>
            <Router pattern="/pages" middlewares={[auth]}>
                <Pages />
            </Router>
            <Router pattern="/pages/:pageId" middlewares={[auth]}>
                <Pages />
            </Router>
            <Router pattern="/pages/add/:parentId" middlewares={[auth]}>
                <PageForm />
            </Router>
            <Router pattern="/pages/edit/:pageId" middlewares={[auth]}>
                <PageForm />
            </Router>
            <Router pattern="/templates" middlewares={[auth]}>
                <Templates />
            </Router>
            <Router pattern="/templates/:templateId" middlewares={[auth]}>
                <TemplateForm />
            </Router>
        </div>
    );
}

export default connect(
    (state) => {
        return {
            router: state.router
        };
    },
    (dispatch) => {
        return {};
    }
)(RoutePages);
