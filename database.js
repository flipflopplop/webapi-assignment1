let books = [
    {
        name: "The Great Adventure",
        author: "Emily Collins",
        quantity: 3,
        categoryId: 2
    },
    {
        name: "The Secret Garden",
        author: "Oliver Thompson",
        quantity: 1,
        categoryId: 3
    },
    {
        name: "The Lost Treasure",
        author: "Sophia Anderson",
        quantity: 4,
        categoryId: 1
    },
    {
        name: "The Mystery of Shadows",
        author: "Jacob Mitchell",
        quantity: 2,
        categoryId: 4
    },
    {
        name: "The Enchanted Forest",
        author: "Isabella Turner",
        quantity: 5,
        categoryId: 2
    },
    {
        name: "The Forgotten Kingdom",
        author: "Ethan Wilson",
        quantity: 3,
        categoryId: 3
    },
    {
        name: "The Hidden Path",
        author: "Ava Roberts",
        quantity: 1,
        categoryId: 1
    },
    {
        name: "The Time Traveler's Diary",
        author: "Liam Thompson",
        quantity: 4,
        categoryId: 4
    },
    {
        name: "The Magical Potion",
        author: "Mia Adams",
        quantity: 2,
        categoryId: 2
    },
    {
        name: "The Secret Code",
        author: "Noah Davis",
        quantity: 5,
        categoryId: 3
    },
    {
        name: "The Haunted Mansion",
        author: "Emma Wilson",
        quantity: 3,
        categoryId: 1
    },
    {
        name: "The Lost Civilization",
        author: "Alexander Turner",
        quantity: 1,
        categoryId: 4
    }
];

let users = [
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
];

let borrows = [
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

let categories = [
    {
        id: 1,
        name: 'Fiction'
    },
    {
        id: 2,
        name: 'Non-fiction'
    },
    {
        id: 3,
        name: 'Mystery/Thriller'
    },
    {
        id: 4,
        name: 'Nature'
    },
    {
        id: 5,
        name: 'History'
    },
]

module.exports.books = books;
module.exports.users = users;
module.exports.borrows = borrows;