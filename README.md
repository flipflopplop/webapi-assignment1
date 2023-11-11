# Isaac's Library Module

This node module provides essential functionality for a library book borrowing service. With this module, book readers can create accounts and borrow books with ease.

## Installation
Before starting, make sure you have [downloaded and installed Node.js](https://nodejs.org/en/download/). This node module has been tested with Node.js v16.17.0.

Then, install the module dependencies with the `npm install` command:
```
npm install
```

## Database System
The database for this module is simulated with a series of arrays, stored in the `database.js` file.

> Please do not delete this file as it is essential for this module to function.

## Testing
The file `sample.js` contains the full list of available functions with working examples provided by this library module. You can test out the module with this file with `npm test`:
```
npm test
```

# Getting Started
Start by requiring the module in your project:

``` javascript
const library = require('./IsaacKoh_Library');
```

## Books
### 1. Add Book(s)
Takes in an `object` and adds the specified number of books to the library. The `object` has to have a name, author and quantity.
``` javascript
const newBook = library.books.add({
    name: 'The New Book',
    author: 'Francis Mellow',
    quantity: 2
});
console.log(newBook);
```

### 2. Get all Books
Returns an array of all books currently in the library. The array will not include books that have been borrowed.
``` javascript
const allBooks = library.books.getAll();
console.log(JSON.stringify(allBooks, null, 2));
```

### 3. Search Book by Name
Returns an array of all books with names containing the search text. It is not case-sensitive.
``` javascript
const nameSearch = library.books.searchName('the M');
console.log(JSON.stringify(nameSearch, null, 2));
```

### 4. Get borrowed Books
Returns an array of all books borrowed from the library.
``` javascript
const allBorrowed = library.books.getAllBorrowed();
console.log(JSON.stringify(allBorrowed, null, 2));
```

### 5. Get Books borrowed by User
Takes in a `user_id` and returns an array containing all books borrowed by the user.
``` javascript
const userBorrows = library.books.getUserBorrows("b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d");
console.log(JSON.stringify(userBorrows, null, 2));
```

### 6. Borrow Book
Takes in a `userId`, `bookName` and `quantity`. The quantity specifies the number of said book to borrow.
``` javascript
const borrowBook = library.books.borrow("b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d", "The Secret Code", 2);
console.log(JSON.stringify(borrowBook, null, 2));
```
- Each user can only borrow up to 2 of the same book

### 7. Return Book
Takes in a `userId`, `bookName` and `quantity`. The quantity specifies the number of said book to return.
``` javascript
const returnBook = library.books.returnBook("b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d", "The Secret Code", 1);
console.log(JSON.stringify(returnBook, null, 2));
```

## Users
### 1. Register
Takes in an `object` and adds it as a new user to the library. Each `object` has to have an email, username and password.
``` javascript
const newUser = library.users.register({
    email: 'newUser@gmail.com',
    username: 'bob',
    password: 'p@ssw0rd'
});
console.log(JSON.stringify(newUser, null, 2));
```
- Each email is unique to an account
- Usernames cannot contain whitespaces
- Passwords have to be at least 8 characters long, containing an alphabet, number and symbol

### 2. Log in
Authenticates user based on username and password. Returns an array containing a message and an `object` containing the user data if the provided credentials are valid.
``` javascript
const loginUser = library.users.login('newUser@gmail.com', 'p@ssw0rd');
console.log(JSON.stringify(loginUser, null, 2));
```

### 3. Get User by ID
Takes in a `userId` and returns an `object` containing specified user data.
``` javascript
const userById = library.users.getById("c5c6c7c8-1b1b-4c4c-7d7d-3e3e3e3e3e3e");
console.log(JSON.stringify(userById, null, 2));
```

### 4. Get User by Email
Takes in an email and returns an `object` containing specified user data.
``` javascript
const userByEmail = library.users.getByEmail("michael.brown@example.com");
console.log(JSON.stringify(userByEmail, null, 2));
```