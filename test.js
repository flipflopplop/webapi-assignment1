const newline = () => console.log('\n');
const library = require('./IsaacKoh_Library');

// // ADD NEW BOOK
// const newBook = library.books.add({
//     name: 'The New Book',
//     author: 'Francis Mellow',
//     quantity: 2
// });
// console.log(newBook);

// newline();
// // GET ALL BOOKS
// const allBooks = library.books.getAll();
// console.log(JSON.stringify(allBooks, null, 2));

// newline();
// // SEARCH BOOKS BY NAME
// const nameSearch = library.books.searchName('the M');
// console.log('Search results: ' + JSON.stringify(nameSearch, null, 2));

// newline();
// // REGISTER USER [minimum 8 characters, at least 1 symbol (#?!@$%^&*_-), letter and number]
// const newUser = library.users.register({
//     email: 'newUser@gmail.com',
//     username: 'bob',
//     password: 'p@ssw0rd'
// });
// console.log(JSON.stringify(newUser, null, 2));

// newline();
// // LOGIN USER (email, password)
// const loginUser = library.users.login('newUser@gmail.com', 'p@ssw0rd');
// console.log(JSON.stringify(loginUser, null, 2));

// newline();
// // GET USER BY ID
// const userById = library.users.getById("c5c6c7c8-1b1b-4c4c-7d7d-3e3e3e3e3e3e");
// console.log(JSON.stringify(userById, null, 2));

// newline();
// // GET USER BY EMAIL
// const userByEmail = library.users.getByEmail("michael.brown@example.com");
// console.log(JSON.stringify(userByEmail, null, 2));

// newline();
// // GET ALL BORROWED BOOKS
// const allBorrowed = library.books.getAllBorrowed();
// console.log(JSON.stringify(allBorrowed, null, 2));

// newline();
// // GET BORROWS BY USERID
// const userBorrows = library.books.getUserBorrows("b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d");
// console.log(JSON.stringify(userBorrows, null, 2));

// newline();
// // BORROW A BOOK
// const borrowBook = library.books.borrow("b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d", "The Secret Code", 2);
// console.log(JSON.stringify(borrowBook, null, 2));

// newline();
// // RETURN A BOOK
// const returnBook = library.books.returnBook("b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d", "The Secret Code", 1);
// console.log(JSON.stringify(returnBook, null, 2));
