const Book = require('./book');

class Library {
    constructor() {
        this._books = [];
        this.initializeBasicLibrary();
    }

    getHighestBookId(){
        if (this._books.length > 0)
            return Math.max.apply(Math, this._books.map(function(book) { return book.getId(); }), -1);
        return -1;
    }

    addBook(isbn, title, description){
        return this._books.push(new Book(this.getHighestBookId() + 1, isbn, title, description));
    }

    getBookById(id){
        let book = this._books.filter(x => x.getId() == id)[0];
        if (book === undefined)
            return null;

        return book;

    }

    getBookByIsbn(isbn){
        let book = this._books.filter(x => x.getIsbn() === isbn)[0];
        if (book === undefined)
            return null;

        return book;
    }

    getNumberOfBook(){
        return this._books.length;
    }

    getLibrary(){
        return this._books;
    }

    listBookOfLibrary(){
        for (let x = 0; x < this.getNumberOfBook(); x++) {
            this._books[x].printBook();
        }

    }

    updateBookTitle(id, title){
        let book = this.getBookById(id);
        if (book !== null){
            book.setTitle(title);
            return true;
        }

        return false;
    }

    updateBookIsbn(id, isbn){
        let book = this.getBookById(id);
        if (book !== null && !this.doesIsbnExists(isbn)){
            book.setIsbn(isbn);
            return true;
        }

        return false;
    }

    updateBookDescription(id, description){
        let book = this.getBookById(id);
        if (book !== null){
            book.setDescription(description);
            return true;
        }

        return false;
    }

    deleteBookById(id){
        for (let x = 0; x < this.getNumberOfBook(); x++) {
            if (this._books[x].getId() == id){
                this._books.splice(x, 1);
                return true;
            }
        }
        return false;
    }

    doesIsbnExists(isbn){
        for (let x = 0; x < this.getNumberOfBook(); x++) {
            if (this._books[x].getIsbn() === isbn){
                return true;
            }
        }
        return false;
    }

    initializeBasicLibrary(){
        this.addBook('9781976519857', 'An Unexpected Cookbook: The Unofficial Book of Hobbit Cookery', 'Hobbit cooking book');
        this.addBook('9781421599465', 'Dragon Ball Super, Vol. 3', 'well ... it\'s Dragon Ball Super, Vol. 3');
        this.addBook('9781974701445', 'Dragon Ball Super, Vol. 4', 'well ... it\'s Dragon Ball Super, Vol. 4');
        this.addBook('9781974704583', 'Dragon Ball Super, Vol. 5', 'well ... it\'s Dragon Ball Super, Vol. 5');
    }

}

module.exports = Library;
