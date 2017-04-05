import React, {Component} from 'react'
import {observer} from "mobx-react";
import userData from "../stores/userStore";
import {observable} from "mobx";

var book = [{
    "id": 1,
    "title": "Harry Potter",
    "info": "info",
    "moreInfo": "more"
}];


const UserPage = observer(
    class UserPage extends Component {

        componentWillMount() {
            /*
             This will fetch data each time you navigate to this route
             Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
             */
            userData.getData();
        }

        submitData = (e) => {
            e.preventDefault();
            userData.postData();
        }

        render() {
            return (
                <div>
                    <h2>Users</h2>
                    <p>This message is fetched from the server if you are properly logged in</p>
                    <div className="msgFromServer">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>title</th>
                                <th>info</th>
                                <th>more info</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userData.messageFromServer.map(book => {
                                return (
                                    <tr key={book.id}>
                                        <td>{book.title}</td>
                                        <td>{book.info}</td>
                                        <td>{book.moreInfo}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div class="form-group">
                        <form action="#" method="post" onSubmit={this.submitData}>
                            <p>Info: <input className="form-control" type="text" name="info" id="info"
                                            placeholder="Info"/></p>
                            <p>More info: <input className="form-control" type="text" name="moreinfo" id="moreinfo"
                                                 placeholder="More info"/></p>
                            <p>Title: <input className="form-control" type="text" name="title" id="title"
                                             placeholder="Title"/></p>
                            <input className="form-control" type="submit" name="submit" id="submit"/>
                        </form>
                    </div>
                    <h4 style={{color: "red"}}>{userData.errorMessage}</h4>
                </div>
            )
        }
    }
)
export default UserPage;