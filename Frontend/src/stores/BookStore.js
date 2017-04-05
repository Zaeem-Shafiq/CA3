import userStore from "./userStore"
import * as React from "react";

class BookStore extends React.Component {

    constructor() {
        super()
        userStore.getData();
        this._books = userStore.messageFromServer;
    }

    get books() {
        return this._books;
    }
};

export default BookStore;