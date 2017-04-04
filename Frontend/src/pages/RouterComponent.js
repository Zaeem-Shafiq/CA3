import React from 'react';
import '../styles/index.css'
import {hashHistory, Router, Route, IndexRoute, Link} from 'react-router'
import App from '../pages/App';
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import UserPage from "../pages/UserPage";
import AdminPage from "../pages/AdminPage";
import auth from "../authorization/auth";
import Documentation from "../pages/Documentation";
import Home from "./Home";
import Company from "./Company";
import Details from "./Details";

const Product = (props) => (
    <div>
        <h2>Our Products</h2>
        <h4>All our great books </h4>
        <ul>
            {props.route.books.map((book, index) => <li key={index}>
                {book.title} <Link to={`products/details/${index}`}>(details)</Link></li>)}
        </ul>
    </div>
)

class RouterComponent extends React.Component {
    render() {
        var books = this.props.bookStore.books;
        return(
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="logout" component={Logout}/>
                <Route path="documentation" component={Documentation}/>
                {auth.isUser ? <Route path="user" component={UserPage}/> : null}
                <Route path="company" component={Company}/>
                {auth.isAdmin ? <Route path="admin" component={AdminPage}/> : null}
                <Route path="product" component={Product} books={books} />
                <Route path="products/details/:id" component={Details} books={books}/>
            </Route>
        </Router>
    );
}
}

export default RouterComponent;