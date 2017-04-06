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
            title: document.getElementById("title").value,
            info: document.getElementById("info").value,
            moreInfo: document.getElementById("moreinfo").value
        };

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
                    document.getElementById("title").value = "";
                    document.getElementById("info").value = "";
                    document.getElementById("moreinfo").value = "";
                }
            }).catch(err => {
            //This is the only way (I have found) to veryfy server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }

    @action
    putData = () => {
        let errorCode = 200;
        console.log(auth.token)
        var book = {
            id: document.getElementById("id").value,
            title: document.getElementById("title").value,
            info: document.getElementById("info").value,
            moreInfo: document.getElementById("moreinfo").value
        };

        const options = fetchHelper.makeOptions("PUT", true,book);

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
                    document.getElementById("title").value = "";
                    document.getElementById("info").value = "";
                    document.getElementById("moreinfo").value = "";
                }
            }).catch(err => {
            //This is the only way (I have found) to veryfy server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }


    @action
    deleteData = (e) => {
        console.log(e.target.parentNode.childNodes[0].innerText)
        let errorCode = 200;
        console.log(auth.token)
        const options = fetchHelper.makeOptions("PUT", true);

        fetch(URL + "api/book/" + e.target.parentNode.childNodes[0].innerText, options)
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
                    document.getElementById("title").value = "";
                    document.getElementById("info").value = "";
                    document.getElementById("moreinfo").value = "";
                }
            }).catch(err => {
            //This is the only way (I have found) to veryfy server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }

    @action
    getEditData = (e) => {
        var target = e.target.parentNode;
        var book = {
            id : target.id,
            title : target.childNodes[0].innerText,
            info : target.childNodes[1].innerText,
            moreinfo : target.childNodes[2].innerText
        };
        console.log(book);
        document.getElementById("id").value = book.id;
        document.getElementById("title").value = book.title;
        document.getElementById("info").value = book.info;
        document.getElementById("moreinfo").value = book.moreinfo;
    }
}

let userStore = new UserStore();

//Only for debugging
//window.userStore = userStore;
export default userStore;
