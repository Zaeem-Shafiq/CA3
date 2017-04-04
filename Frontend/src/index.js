import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import auth from "./authorization/auth";
import RouterComponent from "./pages/RouterComponent";
import BookStore from "./stores/BookStore";

var bookStore = new BookStore();

function requireAuth(nextState, replace) {
  if (!auth.loggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render(
    <RouterComponent bookStore={bookStore}/>,
    document.getElementById('root')
);