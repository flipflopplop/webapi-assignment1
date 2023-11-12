const { v4: uuidv4 } = require('uuid');
var md5 = require('md5');

var books = {
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

var users = {
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

let db = {
    books: [
        {
            name: "The Great Adventure",
            author: "Emily Collins",
            quantity: 3
        },
        {
            name: "The Secret Garden",
            author: "Oliver Thompson",
            quantity: 1
        },
        {
            name: "The Lost Treasure",
            author: "Sophia Anderson",
            quantity: 4
        },
        {
            name: "The Mystery of Shadows",
            author: "Jacob Mitchell",
            quantity: 2
        },
        {
            name: "The Enchanted Forest",
            author: "Isabella Turner",
            quantity: 5
        },
        {
            name: "The Forgotten Kingdom",
            author: "Ethan Wilson",
            quantity: 3
        },
        {
            name: "The Hidden Path",
            author: "Ava Roberts",
            quantity: 1
        },
        {
            name: "The Time Traveler's Diary",
            author: "Liam Thompson",
            quantity: 4
        },
        {
            name: "The Magical Potion",
            author: "Mia Adams",
            quantity: 2
        },
        {
            name: "The Secret Code",
            author: "Noah Davis",
            quantity: 5
        },
        {
            name: "The Haunted Mansion",
            author: "Emma Wilson",
            quantity: 3
        },
        {
            name: "The Lost Civilization",
            author: "Alexander Turner",
            quantity: 1
        }
    ],
    users: [
        {
            id: "e8a6e3a1-4e4d-4e4d-8e8e-1a1a1a1a1a1a",
            email: "john.doe@example.com",
            username: "johndoe",
            password: "def83d72fa5f33634663b911990fa4fb"    // JohnDoe!132
        },
        {
            id: "b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d",
            email: "emma.smith@example.com",
            username: "emmasmith",
            password: "af40ff6dfd89485afcc493ba0b38749a"    // EmmaSmith_456
        },
        {
            id: "c5c6c7c8-1b1b-4c4c-7d7d-3e3e3e3e3e3e",
            email: "alex.wilson@example.com",
            username: "alexwilson",
            password: "2e5c3e7bc4d6097aab4292deadc2c4f8"    // AlexWilson789!
        },
        {
            id: "a9a8a7a6-2c2c-4a4a-6b6b-4f4f4f4f4f4f",
            email: "sarah.jones@example.com",
            username: "sarahjones",
            password: "2424f79d1b3a15b4c2fa9494ceac2d9a"    // SarahJones012?
        },
        {
            id: "d3d4d5d6-5e5e-4d4d-5e5e-5g5g5g5g5g5g",
            email: "michael.brown@example.com",
            username: "michaelbrown",
            password: "86fd8aa6b17db297947be0c2d1341dec"    // MichaelBrown345?
        },
        {
            id: "f1f2f3f4-6g6g-4f4f-4g4g-6h6h6h6h6h6",
            email: "laura.miller@example.com",
            username: "lauramiller",
            password: "665a06822b867486f7c919b07a78adc1"    // LauraMiller678_
        },
        {
            id: "g7g8g9g0-7h7h-4g4g-3h3h-7i7i7i7i7i7",
            email: "david.wilson@example.com",
            username: "davidwilson",
            password: "1ef0dc281f45cd7c774abc8a42e8d2e8"    // DavidWilson9?01
        },
        {
            id: "h1h2h3h4-8i8i-4h4h-2i2i-8j8j8j8j8j8",
            email: "olivia.davis@example.com",
            username: "oliviadavis",
            password: "0f359740bd1cda994f8b55330c86d845"    // p@ssw0rd
        }
    ],
    borrows: [
        {
            id: "e8a6e3a1-4e4d-4e4d-8e8e-1a1a1a1a1a1a",
            userId: "b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d",
            bookName: "The Forgotten Kingdom",
            quantity: 1
        },
        {
            id: "b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d",
            userId: "b2b1b3b4-3a3a-4b4b-9c9c-2d2d2d2d2d2d",
            bookName: "The Enchanted Forest",
            quantity: 2
        },
        {
            id: "c5c6c7c8-1b1b-4c4c-7d7d-3e3e3e3e3e3e",
            userId: "f1f2f3f4-6g6g-4f4f-4g4g-6h6h6h6h6h6",
            bookName: "The Secret Garden",
            quantity: 1
        },
        {
            id: "a9a8a7a6-2c2c-4a4a-6b6b-4f4f4f4f4f4f",
            userId: "c5c6c7c8-1b1b-4c4c-7d7d-3e3e3e3e3e3e",
            bookName: "The Time Traveler's Diary",
            quantity: 2
        },
        {
            id: "d3d4d5d6-5e5e-4d4d-5e5e-5g5g5g5g5g5g",
            userId: "c5c6c7c8-1b1b-4c4c-7d7d-3e3e3e3e3e3e",
            bookName: "The Enchanted Forest",
            quantity: 1
        }
    ]
};

module.exports.books = books;
module.exports.users = users;