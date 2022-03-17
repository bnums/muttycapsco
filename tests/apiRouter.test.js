const axios = require("axios");
const SERVER_ADDRESS = "http://localhost:4000";
const API_URL = process.env.API_URL || SERVER_ADDRESS;
const { client, createReview, getAllReviews } = require("../db");

describe("apiTests", () => {
  let token, registeredUser;
  // let orderToCreateAndUpdate;
  // close db connection and supertest server tcp connection
  afterAll(async () => {
    await client.end();
    handle.close();
  });
  it("should respond with { healthy: true }", async () => {
    const response = await axios.get(`${API_URL}/api`);
    expect(response).toBeTruthy();
  });

  describe("Users", () => {
    describe("POST /users/login", () => {
      it("Logs a user in, requires both a username and password", async () => {
        const { data, status } = await axios.post(
          `${API_URL}/api/users/login`,
          {
            username: "numnum",
            password: "fullstack2",
          }
        );
        expect(data.user.username).toBe("numnum");
        expect(data.message).toBe("you're logged in!");
        expect(data.token).toBeTruthy();
        token = data.token;
        registeredUser = data.user;
      });
    });
  });

  describe("Reviews", () => {
    let reviewToCreateUpdateAndDelete = {
      title: "Test Review",
      comment: "This is a test review",
      rating: 5,
    };
    describe("GET /reviews", () => {
      it("Grabs a list of all the reviews in our database", async () => {
        const { data: allReviewsFromAPI, status } = await axios.get(
          `${API_URL}/api/reviews`
        );
        expect(status).toBe(200);
      });
    });

    describe("POST /reviews/:productId ", () => {
      let productToReviewId = 1;
      it("Creates a new review on a product", async () => {
        const { data: newReview } = await axios.post(
          `${API_URL}/api/reviews/${productToReviewId}`,
          reviewToCreateUpdateAndDelete,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(newReview.productId).toBe(productToReviewId);
        expect(newReview.title).toBe(reviewToCreateUpdateAndDelete.title);
        expect(newReview.comment).toBe(reviewToCreateUpdateAndDelete.comment);
        expect(newReview.rating).toBe(reviewToCreateUpdateAndDelete.rating);
        expect(newReview.creatorId).toBe(registeredUser.id);
        reviewToCreateUpdateAndDelete = newReview;
      });
    });

    describe("PATCH /reviews/:reviewId ", () => {
      let reviewUpdates = {
        title: "Changed my mind after awhile",
        comment:
          "After further looking into this product, I decided I am not that thrilled about it",
        rating: 3,
      };
      it("Updates a review that was previously made by the user", async () => {
        const { data: updatedReview } = await axios.patch(
          `${API_URL}/api/reviews/${reviewToCreateUpdateAndDelete.id}`,
          reviewUpdates,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(updatedReview.title).toBe(reviewUpdates.title);
        expect(updatedReview.comment).toBe(reviewUpdates.comment);
        expect(updatedReview.creatorId).toBe(registeredUser.id);
      });
    });

    describe("DELETE /reviews/:reviewId ", () => {
      it("Deletes a review that was previously made by the user", async () => {
        const { data: deletedReview } = await axios.delete(
          `${API_URL}/api/reviews/${reviewToCreateUpdateAndDelete.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(deletedReview.id).toBe(reviewToCreateUpdateAndDelete.id);
        expect(deletedReview.message).toBe(
          "This review has been succefully deleted"
        );
      });
    });
  });
});
