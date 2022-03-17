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

//GET /reviews/:productId
reviewsRouter.get("/product/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const productReviews = await getAllProductReviews(productId);
    res.send(productReviews);
  } catch (error) {
    next({
      name: "UnableToGetProductReviews",
      message: "Unable to get this products reviews",
    });
  }
});

//GET /reviews/:username
reviewsRouter.get("/user", requireUser, async (req, res, next) => {
  const userId = req.user.id;
  try {
    const allUserReviews = await getAllReviewsByUser(userId);
    res.send(allUserReviews);
  } catch (error) {
    next({
      name: "UnableToGetUserReviews",
      message: "Unable to get this users reviews",
    });
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
      creatorId: userId,
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

//PATCH /reviews/:reviewId
reviewsRouter.patch("/:reviewId", requireUser, async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;
  const { title, comment, rating } = req.body;

  try {
    const selectedReview = await getReviewById(reviewId);
    if (userId != selectedReview.creatorId) {
      return next({
        name: "InvalidUser",
        message: "You cannot edit this review since you are not the owner",
      });
    }

    let updateFields = {
      id: reviewId,
      title: selectedReview.title,
      comment: selectedReview.comment,
      rating: selectedReview.rating,
    };

    if (title) {
      updateFields.title = title;
    }

    if (comment) {
      updateFields.comment = comment;
    }

    if (rating) {
      updateFields.rating = rating;
    }

    const updatedReview = await updateReview(updateFields);
    res.send(updatedReview);
  } catch (error) {
    next({
      name: "ReviewUpdatesFailed",
      message: "Failed to update this review",
    });
  }
});

//DELETE /reviews/:reviewId
reviewsRouter.delete("/:reviewId", requireUser, async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const user = req.user;
  try {
    const selectedReview = await getReviewById(reviewId);
    if (user.id != selectedReview.creatorId && !user.isAdmin) {
      return next({
        name: "InvalidUser",
        message: "You cannot edit this review since you are not the owner",
      });
    }
    const { id } = await deleteReview(reviewId);
    res.send({
      id: id,
      message: "This review has been succefully deleted",
    });
  } catch (error) {
    next({
      name: "ReviewDeleteFailed",
      message: "Failed to delete this review",
    });
  }
});

module.exports = reviewsRouter;
