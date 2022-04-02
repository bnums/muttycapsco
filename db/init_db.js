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
      "isAdmin" BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      rating INTEGER DEFAULT 0,
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
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
        rating: 0,
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
        rating: 5,
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
        rating: 4,
        price: 10.99,
        inventoryQTY: 10,
        category: "Small Pets Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Green knitted yarn frog hat for cat",
        description:
          "These are simple handmade kitty or other small animal accessories that some of which can be worn for long time if it is an indoor animal, but would not leave on it is an if outside cat because they are not break away accessories.",
        rating: 5,
        price: 11.99,
        inventoryQTY: 30,
        category: "Cat Hats",
        productImg:
          "https://i.etsystatic.com/24057414/r/il/2b2ba6/2584411373/il_1588xN.2584411373_9xk1.jpg",
      },
      {
        name: "Sombrero Hat with Ear Holes for Cats ",
        description:
          "This kitty sombrero was designed to be both cute and comfortable.",
        rating: 4,
        price: 14.95,
        inventoryQTY: 15,
        category: "Cat Hats",
        productImg:
          "https://i.etsystatic.com/10692466/r/il/ffef56/1464651589/il_1588xN.1464651589_rbck.jpg",
      },
      {
        name: "Handmade Birthday Cake Small Pets Hat",
        description:
          "The hat is suitable for pet hedgehogs, hamsters, sugar gliders, rats, squirrels, rabbits, guinea pigs, ferret, bird, or other small animals.",
        rating: 3,
        price: 14.99,
        inventoryQTY: 20,
        category: "Small Pets Hats",
        productImg:
          "https://i.etsystatic.com/27232651/r/il/848ee4/3391112841/il_1588xN.3391112841_hzbb.jpg",
      },
      {
        name: "Pikachu Hat",
        description:
          "This knit hat for pets is handmade, perfect for daily wear, weekend parties, Halloween. The hat is suitable for pet hedgehogs, hamsters, sugar gliders, rats, squirrels, rabbits, guinea pigs, ferret, or other small animals.",
        rating: 2,
        price: 13.99,
        inventoryQTY: 10,
        category: "Small Pets Hats",
        productImg:
          "https://i.etsystatic.com/27232651/r/il/0e6bfe/3120964364/il_794xN.3120964364_r9dl.jpg",
      },
      {
        name: "Cowboy Hat for Birdies",
        description: "Parrot-Bird-Hat-cockatoo-Macaw-Conure cowboy costume hat",
        rating: 4,
        price: 12.95,
        inventoryQTY: 15,
        category: "Bird Hats",
        productImg:
          "https://i.etsystatic.com/15987207/r/il/96f876/1369897720/il_1588xN.1369897720_cd5y.jpg",
      },
      {
        name: "Fancy Hat for Birds",
        description: "Costumes for your birds cockatoo Macaw pet ",
        rating: 3,
        price: 12.95,
        inventoryQTY: 10,
        category: "Bird Hats",
        productImg:
          "https://i.etsystatic.com/15987207/r/il/264150/1744987108/il_794xN.1744987108_eim4.jpg",
      },
      {
        name: "King/Queen Hat for the day",
        description:
          "A gorgeous accessory for your lizard, reptile, amphibian or snake! OR not just for our scaly friends, also perfect for , rabbits, guinea pigs, hamsters, gerbils, hedgehogs and many more!",
        rating: 5,
        price: 3.43,
        inventoryQTY: 10,
        category: "Small Pets Hats",
        productImg:
          "https://i.etsystatic.com/29591258/r/il/03b3da/3497313715/il_1588xN.3497313715_s4h3.jpg",
      },
      {
        name: "Mini Beret Hat for Dogs",
        description:
          "comfortable elastic band keeps the hat secure on your pup's head ",
        rating: 3,
        price: 18.0,
        inventoryQTY: 10,
        category: "Dog Hats",
        productImg:
          "https://i.etsystatic.com/8171270/r/il/85cc34/2835595429/il_794xN.2835595429_250e.jpg",
      },
      {
        name: "Baseball Cap  for Dog",
        description: "Protect your pets' eyes from the sunshine in summer.",
        rating: 5,
        price: 19.99,
        inventoryQTY: 10,
        category: "Dog Hats",
        productImg:
          "https://i.etsystatic.com/26657623/r/il/1b738b/2959204422/il_1588xN.2959204422_sqvi.jpg",
      },
      {
        name: "Dog Baseball Cap",
        description: "Handmade baseball cap for dog",
        rating: 3,
        price: 19.99,
        inventoryQTY: 13,
        category: "Dog Hats",
        productImg:
          "https://i.etsystatic.com/26067675/r/il/10dbbd/3290806681/il_1588xN.3290806681_fsl6.jpg",
      },
      {
        name: "Easter Hat for Cat",
        description: "Cute Costume Pet Bunny Rabbit Hat with Ears for Cats ",
        rating: 2,
        price: 8.99,
        inventoryQTY: 5,
        category: "Cat Hats",
        productImg:
          "https://m.media-amazon.com/images/I/61T5RTpioIL._AC_SX679_.jpg",
      },
      {
        name: "Cat Santa Hat ",
        description: "Adorable Christmas costume for your cats",
        rating: 1,
        price: 6.99,
        inventoryQTY: 7,
        category: "Cat Hats",
        productImg:
          "https://m.media-amazon.com/images/I/61WtfM-LxqL._AC_SX679_.jpg",
      },
      {
        name: "Crochet Dog Fruit Sun Hats ",
        description: "Adorable Sun Hats for the dog and it is handmade.",
        rating: 3,
        price: 19.99,
        inventoryQTY: 10,
        category: "Dog Hats",
        productImg:
          "https://m.media-amazon.com/images/I/81t9RCQT3NL._AC_SY355_.jpg",
      },
      {
        name: "Cat Bucket Hat",
        description:
          "The perfect cozy accessory you need this winter! All hats come with an adjustable strap",
        rating: 2,
        price: 20.95,
        inventoryQTY: 14,
        category: "Cat Hats",
        productImg:
          "https://i.etsystatic.com/18476449/r/il/e085a2/3700798969/il_1588xN.3700798969_pp0a.jpg",
      },
      {
        name: "Lion Mane Costume Hat for Cat",
        description: " A life-like Lion fur hat with cute ears",
        rating: 5,
        price: 9.99,
        inventoryQTY: 6,
        category: "Cat Hats",
        productImg:
          "https://m.media-amazon.com/images/I/71tdXcBszhL._AC_SX679_.jpg",
      },
      {
        name: "Cute Handmade Hat for Small Pets",
        description:
          "This hat for pets is handmade, perfect for daily wear, weekend parties, Halloween.",
        rating: 3,
        price: 12.99,
        inventoryQTY: 8,
        category: "Small Pets Hats",
        productImg:
          "https://i.etsystatic.com/27232651/r/il/5df1e2/3390883543/il_1588xN.3390883543_qeet.jpg",
      },
      {
        name: "Cowboy Hat for Bird",
        description: "Handmade hat for Birds, it made with elastic",
        rating: 5,
        price: 11.99,
        inventoryQTY: 5,
        category: "Bird Hats",
        productImg:
          "https://i.etsystatic.com/15987207/r/il/9d591f/1744982648/il_1588xN.1744982648_8262.jpg",
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
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  buildTables,
};
