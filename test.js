const library = require('./IsaacKoh_Library');

// // ADD NEW BOOK
// const newBook = library.books.add({
//     name: 'The New Book',
//     author: 'Francis Mellow',
//     quantity: 2,
//     categoryId: 1,
// });
// console.log('\n' + newBook);

// // GET ALL BOOKS
// const allBooks = library.books.getAll();
// console.log('\n' + allBooks.length);

// // SEARCH BOOKS BY NAME
// const nameSearch = library.books.searchName('the');
// console.log('\nSearch results: ' + JSON.stringify(nameSearch, null, 2));

// // SEARCH BOOKS BY CATEGORY(id)
// const categorySearch = library.books.searchCategory(2);
// console.log('\nSearch results: ' + JSON.stringify(categorySearch, null, 2));

// // REGISTER USER [minimum 8 characters, at least 1 symbol (#?!@$%^&*_-), letter and number]
// const newUser = library.users.register({
//     email: 'newUser@gmail.com',
//     username: 'bob',
//     password: 'p@ssw0rd'
// });
// console.log('\n' + JSON.stringify(newUser, null, 2));

// // LOGIN USER (email, password)
// const loginUser = library.users.login('newUser@gmail.com', 'p@ssw0rd');
// console.log('\n' + JSON.stringify(loginUser, null, 2));

// // GET USER BY ID
// const userById = library.users.getById(loginUser.user.id);
// console.log('\n' + JSON.stringify(userById, null, 2));

// // GET USER BY ID
// const userByEmail = library.users.getByEmail(loginUser.user.email);
// console.log('\n' + JSON.stringify(userByEmail, null, 2));

// // GET ALL BORROWED BOOKS
// const allBorrowed = library.books.getAllBorrowed();
// console.log('\n' + JSON.stringify(allBorrowed, null, 2));

// // GET BORROWS BY USERID
// const userBorrows = library.books.getUserBorrows("b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d");
// console.log('\n' + JSON.stringify(userBorrows, null, 2));

// // BORROW A BOOK
// const borrowBook = library.books.borrow("b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d", "The Secret Code", 2);
// console.log('\n' + JSON.stringify(borrowBook, null, 2));

// // RETURN A BOOK
// const returnBook = library.books.returnBook("b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d", "The Secret Code", 1);
// console.log('\n' + JSON.stringify(returnBook, null, 2));

