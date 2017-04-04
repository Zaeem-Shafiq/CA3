import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { hashHistory, Router, Route, IndexRoute } from 'react-router'
import App from './pages/App';
import Home from './pages/Home';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import auth from "./authorization/auth";
import Documentation from "./pages/Documentation";
import Product from "./pages/Product";


function requireAuth(nextState, replace) {
  if (!auth.loggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="home" component={Home} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="documentation" component={Documentation} />
      <Route path="user" component={UserPage} />
      <Route path="admin" component={AdminPage} />
      <Route path="product" component={Product} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'))