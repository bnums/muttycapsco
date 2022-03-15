const client = require('./client');

const addProductToOrder = async({orderId, productId, quantity, unitPrice, createdAt }) => {
    try{
        const {rows: [orderDetail]} = await client.query(`
        INSERT INTO orderDetails("orderId", "productId", quantity, unitPrice, createdAt)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,[orderId, productId, quantity, unitPrice, createdAt])
        return orderDetail;
    }catch(error){
        throw error;
    }
}

const getOrderByDate = async({id}) => {
    try{
        const {rows }= await client.query(`
            SELECT *
            FROM orderDetails
            WHERE "createdAt" = ${id}
        `)
        return rows
    }catch(error){
        throw error;
    }
}

//update quantity, delete item


module.exports ={ 
    addProductToOrder,
    getOrderByDate
    
}