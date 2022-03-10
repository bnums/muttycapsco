const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping all tables...");
    await client.query(`
    DROP TABLE IF EXISTS users cascade;
    DROP TABLE IF EXISTS reviews cascade; 
    DROP TABLE IF EXISTS products cascade;
    
    `);
    console.log("Finished dropping tables...");
    // DROP TABLE IF EXISTS users;
    // build tables in correct order
    console.log("Starting to build tables...");
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
      price DECIMAL(10,2),
      inventoryQTY INTEGER,
      category VARCHAR(255) UNIQUE NOT NULL,
      productImg VARCHAR(255) not null
    );

    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) NOT NULL, --will use the creator of comment as a ref
      "productId" INTEGER REFERENCES products(id) NOT NULL, --will use the product id number as a ref
      rating INTEGER,
      review TEXT NOT NULL
    );
    
    `);

    console.log("Finished building tables...");
  } catch (error) {
    throw error;
  }
}

async function populateInitialUsers() {
  console.log("Starting to populate users...");
  try {
    const usersToPopulate = [
      {
        username: "bigrubes",
        password: "fullstack1",
        email: "bigrubes@gmail.com",
        isAdmin: false,
      },
      {
        username: "numnum",
        password: "fullstack2",
        email: "numnum@gmail.com",
        isAdmin: false,
      },
      {
        username: "kaiser",
        password: "fullstack3",
        email: "kaiser@gmail.com",
        isAdmin: false,
      },
      {
        username: "daisyduck",
        password: "fullstack4",
        email: "daisyduck@gmail.com",
        isAdmin: false,
      },
      {
        username: "remote",
        password: "controllers",
        email: "remotecontrollers@gmail.com",
        isAdmin: true,
      },
    ];
    const users = await Promise.all(usersToPopulate.map(populateUser));

    console.log("Users populated:");
    console.log(users);
    console.log("Finished populating users!");
  } catch (error) {
    console.error("Error populating users!");
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialUsers)
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
