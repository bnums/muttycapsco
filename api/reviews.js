/*
These will be our routes for our reviewsRouter
All requests to this route must be supplied with a user authenticated token. 
*/
import { Reviews } from "../db";
Reviews.createReview();

//GET /reviews
// Request Parameters: none
// Return Parameters:
/*
[
  {
    id: reviewId,
    creatorId: user(id),
    creatorName: username,
    productId: product(id),
    title: review title
    review: "review of product"
    rating: 1-5,
  },
  {
    id: reviewId,
    creatorId: user(id),
    productId: product(id),
    title: review title
    review: "review of product"
    rating: 1-5,
  },
  ....
]
*/

//POST /reviews
// Request Parameters:
/*
{
  userId: userId
  productId: productId
  title: "Headline for review"
  review: "review of product"
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
