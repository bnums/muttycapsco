const {
  client,
  createProducts,
  createUser,
  createOrders,
  addProductToOrder,
  createReview,
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS reviews ;
    DROP TABLE IF EXISTS orderDetails;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products; 
    DROP TABLE IF EXISTS users;
    
    `);
    await client.query(`
    
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL (10, 2),
      "inventoryQTY" DECIMAL (10, 2),
      category VARCHAR(255) NOT NULL,
      "productImg" VARCHAR(255) not null
    );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "orderTotal" DECIMAL(10, 2) NOT NULL,
      "createdAt" TIMESTAMP,
      "isActive" BOOLEAN DEFAULT false
    );

    CREATE TABLE orderDetails(
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id) NOT NULL,
      "productId" INTEGER REFERENCES products(id) NOT NULL,
      UNIQUE("orderId","productId"),
      quantity INTEGER, 
      "unitPrice" DECIMAL(10, 2),
      "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "creatorId" INTEGER REFERENCES users(id) NOT NULL, 
      "productId" INTEGER REFERENCES products(id) NOT NULL,
      UNIQUE("creatorId","productId"), 
      title VARCHAR(255) DEFAULT NULL,
      UNIQUE("productId",title),
      rating INTEGER DEFAULT 0,
      comment TEXT NOT NULL
    );
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialUsers() {
  try {
    const usersToPopulate = [
      {
        username: "bigrubes",
        password: "fullstack1",
        email: "bigrubes@gmail.com",
        isAdmin: true,
      },
      {
        username: "numnum",
        password: "fullstack2",
        email: "numnum@gmail.com",
        isAdmin: true,
      },
      {
        username: "kaiser",
        password: "fullstack3",
        email: "kaiser@gmail.com",
        isAdmin: true,
      },
      {
        username: "daisyduck",
        password: "fullstack4",
        email: "daisyduck@gmail.com",
        isAdmin: true,
      },
      {
        username: "sugi",
        password: "controllers",
        email: "remotecontrollers1@gmail.com",
        isAdmin: false,
      },
      {
        username: "brad",
        password: "controllers",
        email: "remotecontrollers2@gmail.com",
        isAdmin: false,
      },
      {
        username: "stephen",
        password: "controllers",
        email: "remotecontrollers3@gmail.com",
        isAdmin: false,
      },
      {
        username: "lily",
        password: "controllers",
        email: "remotecontrollers4@gmail.com",
        isAdmin: false,
      },
      {
        username: "daniel",
        password: "controllers",
        email: "remotecontrollers5@gmail.com",
        isAdmin: false,
      },
      {
        username: "monica",
        password: "controllers",
        email: "remotecontrollers6@gmail.com",
        isAdmin: false,
      },
      {
        username: "carly",
        password: "controllers",
        email: "remotecontrollers7@gmail.com",
        isAdmin: false,
      },
      {
        username: "kristen",
        password: "controllers",
        email: "remotecontrollers8@gmail.com",
        isAdmin: false,
      },
    ];
    await Promise.all(usersToPopulate.map(createUser));
  } catch (error) {
    console.error("Error populating users!");
    throw error;
  }
}

async function populateInitialProducts() {
  try {
    const productsToCreate = [
      {
        name: " Winter Warm Knitted Hat ",
        description:
          "Small Medium Dogs Pets Winter Warm Knitted Hat with Ear Holes",
        price: 16.99,
        inventoryQTY: 40,
        category: "Dog Hats",
        productImg:
          "https://m.media-amazon.com/images/I/61jkrNhaRhL._AC_SX466_.jpg",
      },
      {
        name: "Christmas Dog Hat ",
        description:
          "Christmas Dog Hat Crocheted Snood Funny Pet Cap with Pompon Red Green Warm Winter Dog Hat Knit Snood Headwear for Pets & Women & Men (Red, XS) ",
        price: 14.89,
        inventoryQTY: 50,
        category: "Dog Hats",
        productImg:
          "https://m.media-amazon.com/images/I/51F61OnYBwL._AC_SX466_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap1",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap2",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap3",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap4",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap5",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap6",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap7",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap8",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap9",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap10",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap11",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap12",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap13",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap14",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap15",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap16",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap17k",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Mini Cute Pet Hat with Adjustable Elastic Chin Strap18",
        description:
          "8 Pieces Mini Cute Pet Hat with Adjustable Elastic Chin Strap, Snake Hamster Lizard Guinea Pig Knitted Hat Small Reptile Animal Decoration Supplies Lovely Accessories",
        price: 10.99,
        inventoryQTY: 10,
        category: "Hamster Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
    ];
    await Promise.all(productsToCreate.map(createProducts));
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function populateInitialOrders() {
  try {
    const ordersToCreate = [
      {
        userId: 2,
        orderTotal: 16.99,
        createdAt: "2009-04-30 09:44:35",
        isActive: true,
      },
      {
        userId: 4,
        orderTotal: 48.87,
        createdAt: "2020-04-30 06:34:35",
        isActive: false,
      },
      {
        userId: 1,
        orderTotal: 32.97,
        createdAt: "2021-12-01 03:14:55",
        isActive: true,
      },
      {
        userId: null,
        orderTotal: 32.97,
        createdAt: "2022-03-03 07:44:55",
        isActive: true,
      },
    ];

    await Promise.all(ordersToCreate.map(createOrders));
  } catch (error) {
    console.error("Error creating orders");
    throw error;
  }
}

async function populateInitialOrderDetails() {
  try {
    const orderDetailsToCreate = [
      {
        orderId: 1,
        productId: 1,
        quantity: 1,
        unitPrice: 16.99,
        createdAt: "2009-04-30 09:44:35",
      },
      {
        orderId: 2,
        productId: 1,
        quantity: 2,
        unitPrice: 16.99,
        createdAt: "2020-04-30 06:32:15",
      },
      {
        orderId: 2,
        productId: 2,
        quantity: 1,
        unitPrice: 14.89,
        createdAt: "2020-04-30 06:33:25",
      },
      {
        orderId: 3,
        productId: 3,
        quantity: 3,
        unitPrice: 10.99,
        createdAt: "2021-12-01 03:14:55",
      },
    ];

    await Promise.all(orderDetailsToCreate.map(addProductToOrder));
  } catch (error) {
    console.error("Error creating orderDetails");
    throw error;
  }
}

async function populateInitialReviews() {
  try {
    const reviewsToCreate = [
      {
        title: "Fantastic set!",
        comment: "This is a great set for all your adorable pets",
        rating: 5,
        productId: 3,
        creatorId: 5,
      },
      {
        title: "Highly recommend!",
        comment: "Great christmas gift for friends",
        rating: 4,
        productId: 2,
        creatorId: 3,
      },
      {
        title: "Got the job done",
        comment: "Didn't wow me, but it did what I needed it to do",
        rating: 3,
        productId: 3,
        creatorId: 2,
      },
      {
        title: "Fantastic set!",
        comment: "This is a great set for all your adorable pets",
        rating: 3,
        productId: 1,
        creatorId: 1,
      },
      {
        comment: "This is a great set for all your adorable pets",
        productId: 2,
        creatorId: 5,
      },
    ];

    await Promise.all(reviewsToCreate.map(createReview));
  } catch (error) {
    console.error("Error creating reviews");
    throw error;
  }
}

buildTables()
  .then(populateInitialUsers)
  .then(populateInitialProducts)
  .then(populateInitialOrders)
  .then(populateInitialOrderDetails)
  .then(populateInitialReviews)
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  buildTables,
};
