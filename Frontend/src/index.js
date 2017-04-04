import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import RouterComponent from "./pages/RouterComponent";
import BookStore from "./stores/BookStore";

var bookStore = new BookStore();

ReactDOM.render(
    <RouterComponent bookStore={bookStore}/>,
    document.getElementById('root')
);