const client = require('./client');

const createOrder = async({userId, productId, productQuantity, orderSum }) => {
    try{
        const {rows: [order]} = await client.query(`
        INSERT INTO orders("userId", "productId", productQuantity, orderSum)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [userId, productId, productQuantity, orderSum]);
        return order;
    }catch(error){
        throw error;
    }
}

const getAllOrders = async() => {
    try{
        const {rows: order} = await client.query(`
        SELECT orders.*, users.username AS "shopperName"
        FROM products, users
        `, []);
        return order;
    }catch(error){
        throw error;
    }
}

const getOrderbyId = async(id) => {
    try{
        const {rows: order} = await client.query(`
            SELECT * 
            FROM orders
            WHERE id = $1
        `, [id])

        return order;
    }catch(error){
        throw error;
    }
}

//update, delete, or

module.exports ={ 
    createOrder,
    getAllOrders,
    getOrderbyId,

}