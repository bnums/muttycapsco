const { server, handle } = require("../index");
const { client, createReview, getAllReviews } = require("../db");
const supertest = require("supertest");
const request = supertest(server); // http:/localhost/4000:

describe("apiTests", () => {
  let token, registeredUser;
  // let orderToCreateAndUpdate;
  // close db connection and supertest server tcp connection
  afterAll(async () => {
    await client.end();
    handle.close();
  });
  it("should respond with { healthy: true }", async () => {
    const response = await request.get("/api/");
    expect(response.status).toBe(200);
    expect(response.body.healthy).toBe(true);
  });

  describe("Users", () => {
    describe("POST /users/login", () => {
      it("Logs a user in, requires both a username and password", async () => {
        const { body } = await request
          .post("/api/users/login")
          .send({ username: "numnum", password: "fullstack2" });
        expect(body.user.username).toBe("numnum");
        expect(body.message).toBe("you're logged in!");
        expect(body.token).toBeTruthy();
        token = body.token;
        registeredUser = body.user;
      });
    });
  });

  describe("Reviews", () => {
    let reviewToCreateAndUpdate = {
      title: "Test Review",
      comment: "This is a test review",
      rating: 5,
    };
    describe("GET /reviews", () => {
      it("Grab a list of all the reviews in our database", async () => {
        const allReviewsFromDB = await getAllReviews();
        const { body: allReviewsFromAPI } = await request.get("/api/reviews");
        expect(allReviewsFromAPI).toEqual(allReviewsFromDB);
      });
    });

    /* 
    describe("POST /reviews/:productId ", () => {
      let productToReviewId = 1;
      it("Creates a new review on a product", async () => {
        const { body: newReview } = await request
          .post(`/api/reviews/${productToReviewId}`)
          .send(reviewToCreateAndUpdate)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${token}`);
        expect(newReview.productId).toBe(productToReviewId);
        expect(newReview.title).toBe(reviewToCreateAndUpdate.title);
        expect(newReview.comment).toBe(reviewToCreateAndUpdate.comment);
        expect(newReview.rating).toBe(reviewToCreateAndUpdate.rating);
        expect(newReview.creatorId)
        reviewToCreateAndUpdate = newReview.id
      });
    */

    describe("PATCH /reviews/reviewId ", () => {
      let reviewUpdates = {
        title: "Changed my mind after awhile",
        comment:
          "After further looking into this product, I decided I am not that thrilled about it",
        rating: 3,
      };
      it("Updates a review that was previously made by the user", async () => {
        const { body: updatedReview } = await request
          .post(`/api/reviews/${reviewToCreateAndUpdate.id}`)
          .send(reviewUpdates)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${token}`);
      });
    });
  });
});
