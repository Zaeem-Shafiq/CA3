import {observable, action} from "mobx";
import fetchHelper from "./fetchHelpers";
import auth from "../authorization/auth";
const URL = require("../../package.json").serverURL;


class UserStore {
    @observable messageFromServer = [];
    @observable errorMessage = "";

    @action
    setErrorMessage = (err) => {
        this.errorMessage = err;
    }

    @action
    getData = () => {
        this.errorMessage = "";
        this.messageFromServer = [];
        let errorCode = 200;
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/book", options)
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
        console.log(auth.token)
        var book = {
            title: 'asd',//document.getElementById("title").value,
            info: "asd", //document.getElementById("info"),
            moreInfo: "adad",// document.getElementById("moreinfo")
        };
        var data = JSON.stringify(book);

        const options = fetchHelper.makeOptions("POST", true,book);

        fetch(URL + "api/book", options)
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

        // fetch(URL + "api/book", {
        //     method: "post",
        //     headers: {'Authorization': auth.isUser, 'Accept': 'application/json', 'Content-Type': 'application/json'},
        //     body: JSON.stringify(book)})
        //     .then(function(res){
        //         return res.text();
        //     })
        //     .then(function(text){
        //         console.log(text);
        //         //this.getData();
        //     });

}}

let userStore = new UserStore();

//Only for debugging
//window.userStore = userStore;
export default userStore;
