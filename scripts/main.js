// Book Class: Represents a Book
 class Book {
     constructor(title, author, isbn) {
         this.title = title;
         this.author = author;
         this.isbn = isbn;
     }
 }
// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
    
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }


    static addBookToList(book){
        const list =  document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }


}

// Store Class: Handles Storage
class Store {
    static getBooks(){
        let books;
      if(localStorage.getItem('books') === null){
          books = [];
      } else {
          books = JSON.parse(localStorage.getItem('books'));
      }

      return books;
    }

    static addBook(book){
       const books = Store.getBooks();

       books.push(book);
       localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((books, index) => {
            if(books.isbn === isbn) {
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));

    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault()
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author == '' || isbn =='') {
        document.querySelector('.alert').innerHTML = 'Please Fill in The form <i class="fas fa-exclamation-triangle"></i>';
        document.querySelector('.alert').classList.add("alert-danger");
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }
    else {
            // Instatiate book
   const book = new Book(title, author, isbn);
   document.querySelector('.alert').innerHTML = 'Book Successfully Added <i class="far fa-check-circle"></i>';
   document.querySelector('.alert').classList.add("alert-success");
   setTimeout(() => document.querySelector('.alert').remove(), 3000)


   // Add book to UI
  UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

   // Clear field
   UI.clearFields();
    }


})
// Event: Remove a Book

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    document.querySelector('.alert').innerHTML = 'Book Removed <i class="fas fa-exclamation-triangle"></i>';
    document.querySelector('.alert').classList.add("alert-success");
    setTimeout(() => document.querySelector('.alert').remove(), 3000)
})