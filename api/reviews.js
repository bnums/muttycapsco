/*
These will be our routes for our reviewsRouter
All requests to this route must be supplied with a user authenticated token. 
*/
const express = require("express");
const reviewsRouter = express();
const {
  getAllReviews,
  getAllProductReviews,
  getAllReviewsByUser,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
} = require("../db");
const { requireUser } = require("./utils");

reviewsRouter.use((req, res, next) => {
  console.log("A request is being made to /reviews");
  next();
});

//GET /reviews from db
reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.send(reviews);
  } catch (error) {
    next({ name: "UnableToGetReviews", message: "Unable to get all reviews" });
  }
});

//POST /reviews/:productId
reviewsRouter.post("/:productId", requireUser, async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.user.id;

  try {
    if (!req.body.comment) {
      return next({
        name: "NoCommentForReview",
        message: "Please leave a comment with your reviews",
      });
    }

    if (req.body.comment.length > 2000 || req.body.title.length > 100) {
      return next({
        name: "CommentTooLong",
        message: "Please shorten your comment/title",
      });
    }
    const newReview = await createReview({
      userId: userId,
      productId: productId,
      ...req.body,
    });
    res.send(newReview);
  } catch (error) {
    next({
      name: "FailedToAddReview",
      message:
        "Sorry but we were unable to add this review on this product right now",
    });
  }
});

// Return Parameters:
/* 
{
  id:
  creatorId: userId
  creatorName: name 
  productId: productId
  title: "Headline for review"
  review: "review of product"
  rating: 1-5
}
*/

//PATCH /reviews/:reviewId
// Request Parameters:
/*
{
  title: "updated headline",
  review: "review of product",
  rating: 1-5
}
*/
// Return Parameters:
/* 
{
  id:
  creatorId: userId
  creatorName: name 
  productId: productId
  title: "Headline for review"
  review: "review of product"
  rating: 1-5
  message: review successfully updated!
}
*/
//DELETE /reviews/:reviewId
// Request Parameters: none
// Return Parameters:
/* 
{
  id:
  creatorId: userId
  creatorName: name 
  productId: productId
  title: "Headline for review"
  review: "review of product"
  rating: 1-5
  message: review successfully deleted! 
}
*/

module.exports = reviewsRouter;
