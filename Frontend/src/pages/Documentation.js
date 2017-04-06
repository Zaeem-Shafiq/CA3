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
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><b>api/book</b> --> Returns all books as a JSON-object</td>
                    </tr>
                    <tr>
                        <td><b>api/book/[id]</b> --> Returns the book with the given id as a JSON-object
                        </td>
                    </tr>
                    <tr>
                        <td><b>api/user</b> --> Returns all users as a JSON-object</td>
                    </tr>
                    <tr>
                        <td><b>POST</b></td>
                    </tr>
                    <tr>
                        <td><b>api/book</b> --> Creates a new book given a JSON-object</td>
                    </tr>
                    <tr>
                        <td><b>api/user</b> --> Creates a new user given a JSON-object</td>
                    </tr>
                    <tr>
                        <td><b>PUT</b></td>
                    </tr>
                    <tr>
                        <td><b>api/book</b> --> Updates a existing book given a JSON-object</td>
                    </tr>
                    <tr>
                        <td><b>DELETE</b></td>
                    </tr>
                    <tr>
                        <td><b>api/book/[id]</b> --> Deletes a existing book with the given id</td>
                    </tr>
                    <tr>
                        <td><b>api/user/[id]</b> --> Deletes a existing user with the given username/id</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}