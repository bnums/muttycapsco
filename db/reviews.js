const client = require("./client");

async function getAllReviews() {
  try {
    const { rows: reviews } = await client.query(`
    SELECT * FROM reviews
    `);
    return reviews;
  } catch (error) {
    throw error;
  }
}

async function getAllProductReviews(productId) {
  try {
    const { rows: productReviews } = await client.query(
      `
    SELECT reviews.*, products.name FROM reviews
    JOIN products ON products.id = reviews."productId"
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
async function createReview(reviewFields) {
  try {
    const columns = Object.keys(reviewFields)
      .map((key) => `"${key}"`)
      .join(", ");
    const vals = Object.keys(reviewFields)
      .map((key, index) => `$${index + 1}`)
      .join(", ");
    if (columns.length === 0) {
      return;
    }

    const {
      rows: [review],
    } = await client.query(
      `
    INSERT INTO reviews(${columns})
    VALUES(${vals})
    RETURNING*;
    `,
      Object.values(reviewFields)
    );
    return review;
  } catch (error) {
    throw error;
  }
}
async function updateReview(reviewFields) {
  const reviewId = reviewFields.id;
  delete reviewFields.id;
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
    RETURNING reviews.id;
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
