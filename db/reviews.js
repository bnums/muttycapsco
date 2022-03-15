const client = require("../client");

async function getAllReviews() {
  try {
    const { rows: reviews } = await client.query(`
    SELECT * FROM reviews
    `);
    return reviews;
  } catch (error) {}
}

async function getAllProductReviews(productId) {
  try {
    const { rows: productReviews } = await client.query(
      `
    SELECT reviews.*, products.name FROM reviews
    JOIN prodcuts ON products.id = reviews."productId"
    WHERE "productId" = $1;
    `,
      [productId]
    );
    return productReviews;
  } catch (error) {
    throw error;
  }
}

async function getAllReviewsByUser(userId) {
  try {
    const { rows: userReviews } = await client.query(
      `
    SELECT reviews.*, users.username AS "creatorName" FROM reviews
    JOIN users ON users.id = reviews."userId"
    WHERE "userId" = $1;
    `,
      [userId]
    );
    return userReviews;
  } catch (error) {
    throw error;
  }
}
async function getReviewById(reviewId) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    SELECT * FROM reviews
    WHERE id = $1
    `,
      [reviewId]
    );
    return review;
  } catch (error) {
    throw error;
  }
}
async function createReview({ userId, productId, title, rating, comment }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    INSERT INTO reviews("userId","productId",title, rating, comment)
    VALUES($1,$2,$3,$4)
    RETURNING*;
    `,
      [userId, productId, title, rating, comment]
    );
    return review;
  } catch (error) {
    throw error;
  }
}
async function updateReview({ reviewId, ...reviewFields }) {
  const setString = Object.keys(reviewFields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      UPDATE reviews
      SET ${setString}
      WHERE id = ${reviewId}
      RETURNING *;
      `,
      Object.values(reviewFields)
    );
    return review;
  } catch (error) {
    throw error;
  }
}
async function deleteReview(reviewId) {
  try {
    const {
      rows: [deletedReview],
    } = await client.query(
      `
    DELETE FROM reviews
    WHERE id = $1
    RETURNING *;
    `,
      [reviewId]
    );
    return deletedReview;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllReviews,
  getAllProductReviews,
  getAllReviewsByUser,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
};
