import React, {Component} from "react";

export default class About extends Component {
    render() {

        return (
            <div>
                <h1>Documentation</h1>
                <h5>CA3 - Group 1 - Asger, Joacim & Zaeem</h5>
                <a href="https://github.com/Zaeem-Shafiq/CA3">See GitHub</a>
                <br/>
                <a href="https://vetterlain.dk/CA3/api/book">See API</a>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>GET</th>
                        <th>POST</th>
                        <th>PUT</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>api/book</b> --> Returns all books with all details as a JSON-object</td>
                    </tr>
                    <tr>
                        <td><b>api/book/[id]</b> --> Returns the book (with the given id) with all details as a JSON-object</td>
                        <td><b>api/book</b> --> Creates a new book given a JSON-object</td>
                        <td>Moe</td>
                        <td>mary@example.com</td>
                    </tr>
                    <tr>
                        <td>July</td>
                        <td>Dooley</td>
                        <td>july@example.com</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}