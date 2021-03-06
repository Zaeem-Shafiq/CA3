import React, {Component} from 'react'
import {observer} from "mobx-react";
import userData from "../stores/userStore";

const UserPage = observer(
    class UserPage extends Component {
        submitData = (e) => {
            e.preventDefault();
        }


        render() {
            return (
                <div>
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
                                    <tr key={book.id} id={book.id} onDoubleClick={userData.getEditData}>
                                        <td>{book.title}</td>
                                        <td>{book.info}</td>
                                        <td>{book.moreInfo}</td>
                                        <td>
                                            <button onClick={userData.deleteData}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div class="form-group">
                        <form action="#" method="post" onSubmit={this.submitData}>
                            <p>Id: <input className="form-control" type="text" name="id" id="id"
                                          placeholder="Id" disabled/></p>
                            <p>Title: <input className="form-control" type="text" name="title" id="title"
                                             placeholder="Title"/></p>
                            <p>Info: <input className="form-control" type="text" name="info" id="info"
                                            placeholder="Info"/></p>
                            <p>More info: <input className="form-control" type="text" name="moreinfo" id="moreinfo"
                                                 placeholder="More info"/></p>
                            <input className="form-control" type="submit" name="create" id="create" value="Create"
                                   onClick={function () {
                                       userData.postData()
                                   }}/>
                            <input className="form-control" type="submit" name="edit" id="edit" value="Edit"
                                   onClick={function () {
                                       userData.putData()
                                   }}/>
                        </form>
                    </div>
                    <h4 style={{color: "red"}}>{userData.errorMessage}</h4>
                </div>
            )
        }
    }
)
export default UserPage;