const {
  client,
  createProducts,
  createUser,
  createOrders,
  addProductToOrder,
  createReview,
} = require("./");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS orderDetails;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS cartItems;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS products; 
    DROP TABLE IF EXISTS userAddress;
    DROP TABLE IF EXISTS users;
    
    `);
    await client.query(`
    
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "isAdmin" BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE userAddress(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "addressLine1" VARCHAR(255),
      "addressLine2" VARCHAR(255),
      city VARCHAR(255),
      state VARCHAR(255),
      "postalCode" INTEGER,
      phone VARCHAR(255)
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      rating INTEGER DEFAULT 0,
      price DECIMAL (10, 2),
      "inventoryQTY" DECIMAL (10, 2),
      category VARCHAR(255) NOT NULL,
      "productImg" VARCHAR(255) NOT NULL
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

    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      status VARCHAR(255)
    );

    CREATE TABLE cartItems(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id) NOT NULL,
      "cartId" INTEGER REFERENCES cart(id) NOT NULL,
      price FLOAT NOT NULL DEFAULT 0,
      quantity INTEGER NOT NULL DEFAULT 0,
      UNIQUE("productId","cartId")
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
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
        username: "Sugi",
        password: "controllers",
        email: "remotecontrollers1@gmail.com",
        isAdmin: false,
      },
      {
        username: "Brad",
        password: "controllers",
        email: "remotecontrollers2@gmail.com",
        isAdmin: false,
      },
      {
        username: "Stephen",
        password: "controllers",
        email: "remotecontrollers3@gmail.com",
        isAdmin: false,
      },
      {
        username: "Lily",
        password: "controllers",
        email: "remotecontrollers4@gmail.com",
        isAdmin: false,
      },
      {
        username: "Daniel",
        password: "controllers",
        email: "remotecontrollers5@gmail.com",
        isAdmin: false,
      },
      {
        username: "Michael",
        password: "controllers",
        email: "remotecontrollers6@gmail.com",
        isAdmin: false,
      },
      {
        username: "Jim",
        password: "controllers",
        email: "remotecontrollers7@gmail.com",
        isAdmin: false,
      },
      {
        username: "Pam",
        password: "controllers",
        email: "remotecontrollers8@gmail.com",
        isAdmin: false,
      },
      {
        username: "Angela",
        password: "controllers",
        email: "remotecontrollers9@gmail.com",
        isAdmin: false,
      },
      {
        username: "Dwight",
        password: "controllers",
        email: "remotecontrollers10@gmail.com",
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
        name: "Yellow Beanie",
        description:
          "A yellow beanie made with cotton and designed for all dogs by Loumineux",
        rating: 0,
        price: 10.0,
        inventoryQTY: 40,
        category: "Beanie",
        productImg:
          "https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
      {
        name: "Red Beret",
        description:
          "A red beret designed and knitted by designers of Loui Laboui",
        rating: 5,
        price: 10.0,
        inventoryQTY: 50,
        category: "Hats",
        productImg:
          "https://images.unsplash.com/photo-1529088363398-8efc64a0eb95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1584&q=80",
      },
      {
        name: "Crimson Hood",
        description:
          "A red cover hood that is perfect for keeping your best friend warm in cold weather conditions",
        rating: 5,
        price: 7.0,
        inventoryQTY: 50,
        category: "Hats",
        productImg:
          "https://images.unsplash.com/photo-1513656972721-194d61556970?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
      },
      {
        name: "Blue Beanie",
        description:
          "A yellow beanie made with cotton and designed for all dogs by Loumineux",
        rating: 5,
        price: 9.0,
        inventoryQTY: 50,
        category: "Beanie",
        productImg:
          "https://images.unsplash.com/photo-1636666429444-b34e8b9ffc24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      },
      {
        name: "Flower Fedora",
        description:
          "The latest addition to the line by Phénomène, an elegant and classy design for styling and beautifying all types of fits",
        rating: 5,
        price: 15.0,
        inventoryQTY: 50,
        category: "Hats",
        productImg:
          "https://images.unsplash.com/photo-1595414350619-5fe202d99eb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
      {
        name: "Orange Beanie",
        description:
          "An orange beanie made with cotton and designed for all dogs by Loumineux",
        rating: 5,
        price: 9.0,
        inventoryQTY: 50,
        category: "Hats",
        productImg:
          "https://images.unsplash.com/photo-1641069203366-12db9d0831d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1586&q=80",
      },
      {
        name: "Green Feather Cap",
        description:
          "An orange beanie made with cotton and designed for all dogs by Loumineux",
        rating: 5,
        price: 10.0,
        inventoryQTY: 50,
        category: "Hats",
        productImg:
          "https://images.unsplash.com/photo-1628976558388-73413979e22d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1426&q=80",
      },
      {
        name: "Grey Fedora",
        description:
          "A classic old-timey look by designed and manufactured by Phénomène",
        rating: 5,
        price: 15.0,
        inventoryQTY: 50,
        category: "Hats",
        productImg:
          "https://images.unsplash.com/photo-1612637306950-fd33786d912e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1506&q=80",
      },
      {
        name: "Black and Orange Beanie with Puffball",
        description:
          "A classic black and orange beanie with a puffball on top.",
        rating: 5,
        price: 15.0,
        inventoryQTY: 50,
        category: "Beanie",
        productImg:
          "https://images.unsplash.com/photo-1551308075-d5f542da6386?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
      },
      {
        name: "Sombroro",
        description: "A yellow somberero for your dog bro",
        rating: 5,
        price: 8.0,
        inventoryQTY: 50,
        category: "Beanie",
        productImg:
          "https://images.unsplash.com/photo-1609910063430-33fc20be9f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1530&q=80",
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
        isActive: false,
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
        isActive: false,
      },
      {
        userId: null,
        orderTotal: 32.97,
        createdAt: "2022-03-03 07:44:55",
        isActive: false,
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
  .then(console.log("... Finished building DB"))
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  buildTables,
};
