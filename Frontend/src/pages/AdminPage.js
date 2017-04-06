import React, {Component} from 'react'
import {observer} from "mobx-react";
import userData from "../stores/adminStore";

const AdminPage = observer(
    class AdminPage extends Component {

        componentWillMount() {
            /*
             This will fetch data each time you navigate to this route
             Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
             */
            userData.getData();
        }

        submitData = (e) => {
            e.preventDefault();
        }

        render() {
            return (
                <div>
                    <div>
                        <div className="msgFromServer">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userData.messageFromServer.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.userName}</td>
                                            <td>{user.passwordHash}</td>
                                            <td>{user.roles.map(role => <p>{role.roleName}</p>)}</td>
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
                                <p>Username: <input className="form-control" type="text" name="username" id="username"
                                                    placeholder="Username"/></p>
                                <p>Password: <input className="form-control" type="password " name="password"
                                                    id="password"
                                                    placeholder="password"/></p>
                                <p>Role: <input className="form-control" type="text" name="role" id="role"
                                                placeholder="Role"/></p>
                                <input className="form-control" type="submit" name="create" id="create" value="Create"
                                       onClick={function () {
                                           userData.postData()
                                       }}/>
                            </form>
                        </div>
                        <h4 style={{color: "red"}}>{userData.errorMessage}</h4>
                    </div>
                    <h4 style={{color: "red"}}>{userData.errorMessage}</h4>
                </div>
            )
        }

    }
)
export default AdminPage;