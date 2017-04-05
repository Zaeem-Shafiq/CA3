import React, {Component} from 'react'
import {observer} from "mobx-react";
import userData from "../stores/userStore";

const UserPage = observer(
    class UserPage extends Component {
        submitData = (e) => {
            e.preventDefault();
            userData.postData();
        }
        render() {
            return (
                <div>
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