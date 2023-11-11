const { v4: uuidv4 } = require('uuid');
var md5 = require('md5');

// array database
const db = require('./database');

module.exports.books = {
    // get all books in library
    getAll() {
        return db.books;
    },

    // Explain what function B does
    add(newBook) {
        // check if name, author and quantity are given
        if (newBook.name==undefined) return { message: "Failed to add book(s) - Book name required." };
        if (newBook.author==undefined) return { message: "Failed to add book(s) - Book author required." };
        if (newBook.quantity==undefined) return { message: "Failed to add book(s) - Book quantity required." };

        // check if book name exists
        if (db.books.find(b => b.name == newBook.name)) {
            // increment quantity of found book
            db.books[db.books.findIndex(b => b.name == newBook.name)].quantity += newBook.quantity;
            return `Successfully added: '${newBook.name}' x${newBook.quantity}`;

        } else {
            // create a new book if new
            db.books.push({
                name: newBook.name,
                author: newBook.author,
                quantity: newBook.quantity
            });
            return `Successfully created: '${newBook.name}' x${newBook.quantity}`;
        }
    },

    // search book by name
    searchName(name) {
        // search regardless of case
        return db.books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));
    },

    // get all borrowed records
    getAllBorrowed() {
        return db.borrows;
    },

    // get books borrowed by user & the quantity of each book
    getUserBorrows(userId) {
        let borrowed = db.borrows.filter(borrow => borrow.userId == userId);

        // format response to only return book name and quantity
        let result = [];
        borrowed.forEach(borrow => {
            result.push({
                bookName: borrow.bookName,
                quantity: borrow.quantity
            });
        });

        let user = db.users.find(u => u.id == userId);
        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
            borrowed: result
        };
    },

    // create new borrow record
    borrow(userId, bookName, quantity) {
        let user = db.users.find(u => u.id == userId);
        let book = db.books.find(b => b.name == bookName);
    
        // check if userId and bookId exists
        if (user==undefined) return { message: "Failed - User does not exist." };
        if (book==undefined) return { message: "Failed - Book does not exist." };

        // check that there is enough book stock to borrow
        if (book.quantity < quantity) return { message: "Failed - Not enough book stock to borrow" };
        if (quantity > 2) return { message: "Failed - You cannot borrow more than 2 of the same book." };

        // check if user has borrowed this book before
        let checkBorrow = db.borrows[db.borrows.findIndex(b => b.userId==userId && b.bookName==bookName)];
        if (checkBorrow != undefined) {
            // check if user will be borrowing more than 2 books
            if (checkBorrow.quantity + quantity > 2) {
                return { message: "Failed - You cannot borrow more than 2 of the same book." };
            } else {
                // deduct quantity of books
                db.books[db.books.findIndex(b => b.name == bookName)].quantity -= quantity;

                // add quantity of book
                db.borrows[db.borrows.findIndex(b => b.userId==userId && b.bookName==bookName)].quantity += quantity;
            }

        } else {
            // deduct quantity of books
            db.books[db.books.findIndex(b => b.name == bookName)].quantity -= quantity;

            // create new borrow record
            let newBorrow = {
                'id': uuidv4(),
                'userId': userId,
                'bookName': bookName,
                'quantity': quantity
            };
            db.borrows.push(newBorrow);
        }
        return { message: `Successfully Borrowed - '${bookName}' x${quantity}` };
    },

    returnBook(userId, bookName, quantity) {
        let user = db.users.find(u => u.id == userId);
        let book = db.books.find(b => b.name == bookName);
    
        // check if userId and bookId exists
        if (user==undefined) return { message: "Failed - User does not exist." };
        if (book==undefined) return { message: "Failed - Book does not exist." };

        // check borrow record exists
        let borrowIdx = db.borrows.findIndex(b => b.userId==userId && b.bookName==bookName);
        if (borrowIdx < 0) return { message: "Failed - User has not borrowed this book." };

        // check if quantity is too high
        if (db.borrows[borrowIdx].quantity < quantity) {
            return { message: "Failed - User has not borrowed this many books to return." };

        } else {
            // return book, decrement quantity of borrow record
            db.borrows[borrowIdx].quantity -= quantity;

            // if borrow record has no quantity, remove it
            if (db.borrows[borrowIdx].quantity <= 0) db.borrows.splice(borrowIdx, 1);

            // increment quantity of books
            db.books[db.books.findIndex(b => b.name == bookName)].quantity += quantity;

            return { message: `Successfully Returned - '${bookName}' x${quantity}` };
        }
    }
}

module.exports.users = {
    // register new user
    register(newUser) {
        // check that fields are given
        if (newUser.email==undefined) return { message: "Failed - Email is required." };
        if (newUser.username==undefined) return { message: "Failed - Username is required." };
        if (newUser.password==undefined) return { message: "Failed - Password is required." };

        // check that username is unique
        if (db.users.find(u => u.email == newUser.email)) return { message: "Failed - Sorry, this email has already been taken." };

        // check password strength
        const regex = new RegExp("^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$");
        if (!regex.test(newUser.password)) return { message: "Failed - Password strength is too weak." };

        // validate username
        if (newUser.username.includes(' ')) return { message: "Failed - Username must not have whitespaces." };
        
        // store user
        db.users.push({
            id: uuidv4(),
            email: newUser.email,
            username: newUser.username,
            password: md5(newUser.password)
        });

        // return user details without password
        let user = db.users.at(-1)
        return {
            message: 'Registration Success',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        };
    },

    // login user
    login(email, password) {
        // find account with email input
        let accountIdx = db.users.findIndex(user => user.email == email);

        // check if account exists with email input
        if (accountIdx != -1) {
            // validate password
            if (db.users[accountIdx].password == md5(password)) {

                // return user details without password
                let loginUser = db.users[accountIdx];
                return {
                    message: 'Login Success',
                    user: {
                        id: loginUser.id,
                        email: loginUser.email,
                        username: loginUser.username
                    }
                };
            }
        }

        // invalid email, or password
        return { message: "Failed - Invalid credentials provided."};
    },

    // get user by id
    getById(id) {
        // get user
        let user = db.users.find(u => u.id == id);

        // if user is found, return it. else return fail
        return user != undefined ? user : { message: "Failed - User not found." };
    },

    // get user by email
    getByEmail(email) {
        // get user
        let user = db.users.find(u => u.email == email);

        // if user is found, return it. else return fail
        return user != undefined ? user : { message: "Failed - User not found." };
    }
}