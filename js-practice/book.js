const myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        let readString = read ? "read already" : "not read yet";
        return `${title} by ${author}, ${pages} pages, ${readString}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function showAllBooks(){
    myLibrary.forEach(book => console.log(book.info()));
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 256, false);
addBookToLibrary("Doctor Zhivago", "B. Pasternak", 180, true);
showAllBooks();