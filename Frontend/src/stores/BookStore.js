import userStore from "./userStore"


export default class BookStore {
    constructor() {
        userStore.getData();
        this._books = userStore.messageFromServer;
    }
    get books() {
        return this._books;
    }
}
