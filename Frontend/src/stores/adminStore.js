import {observable, action} from "mobx";
import fetchHelper from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

/* encapsulates Data related to Admins */
class AdminStore {
    @observable messageFromServer = [];
    @observable errorMessage = "";

    @action
    setErrorMessage(err) {
        this.errorMessage = err;
    }

    @action
    getData = () => {
        this.errorMessage = "";
        let errorCode = 200;
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/user", options)
            .then((res) => {
                if (res.status > 210 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then(action((res) => {  //Note the action wrapper to allow for useStrict
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    this.messageFromServer.replace(res);
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }

    @action
    postData = () => {
        let errorCode = 200;
        var user = {
            userName: document.getElementById("username").value,
            passwordHash: document.getElementById("password").value,
            roles: [{roleName: document.getElementById("role").value}]
        };

        const options = fetchHelper.makeOptions("POST", true, user);

        fetch(URL + "api/user", options)
            .then((res) => {
                if (res.status > 200 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then((res) => {
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    this.getData();
                    document.getElementById("username").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("role").value = "";
                }
            }).catch(err => {
            //This is the only way (I have found) to veryfy server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }

    @action
    deleteData = (e) => {
        let errorCode = 200;
        const options = fetchHelper.makeOptions("DELETE", true);

        fetch(URL + "api/user/" + e.target.parentNode.parentNode.childNodes[0].innerHTML, options)
            .then((res) => {
                if (res.status > 200 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then((res) => {
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    this.getData();
                }
            }).catch(err => {
            //This is the only way (I have found) to veryfy server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }
}
let adminStore = new AdminStore(URL);

//Only for debugging
//window.adminStore = adminStore;
export default adminStore;
