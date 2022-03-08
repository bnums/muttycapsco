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
    DROP TABLE IF EXISTS reviews; 
    `);
    console.log("Finished dropping tables...");

    // build tables in correct order
    console.log("Starting to build tables...");
    await client.query(`
    
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES user(id) NOT NULL, --will use the creator of comment as a ref
      "productId" INTEGER REFERENCES products(id) NOT NULL, --will use the product id number as a ref
      rating INTEGER,
      review TEXT NOT NULL
    )
    
    `);

    console.log("Finished building tables...");
  } catch (error) {
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
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
