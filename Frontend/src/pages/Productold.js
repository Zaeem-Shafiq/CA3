import React, {Component} from 'react'
import {Link} from "react-router";
import BookStore from "../stores/BookStore";


export default class Product extends Component{

  render() {
    let books = new BookStore();
    return (
        <div>
            <h2>Our Products</h2>
            <h4>All our great books </h4>
            <ul>
                {this.books.map((book, index) => <li key={index}>
                    {book.title} <Link to={`products/details/${index}`}>(details)</Link></li>)}
            </ul>
        </div>
    )
  }
}