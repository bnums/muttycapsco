const client = require('./client');

const addProductToOrder = async({orderId, productId, quantity, unitPrice, createdAt }) => {
    try{
        const {rows: [orderDetail]} = await client.query(`
        INSERT INTO orderDetails("orderId", "productId", quantity, "unitPrice", "createdAt")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,[orderId, productId, quantity, unitPrice, createdAt])
        return orderDetail;
    }catch(error){
        throw error;
    }
}

const getOrderByDate = async({createdAt}) => {
    try{
        const {rows }= await client.query(`
            SELECT *
            FROM orderDetails
            WHERE "createdAt" = $1
        `,[createdAt])
        return rows
    }catch(error){
        throw error;
    }
}

//update quantity, delete item
const updateQuantity = async({quantity, ...fields}) => {
    try {
            const setString = Object.keys(fields)
            .map((key, idx) => `"${key}"=$${idx + 1}`)
            .join(', ')
    
            if (setString.length === 0) return
    
            const { rows: [updatedQuantity]} = await client.query(
            `
                UPDATE orderDetails
                SET ${setString}
                WHERE id = ${quantity}
                RETURNING *;
            `,
            Object.values(fields)
            )
    
            return updatedQuantity
        } catch (err) {
        throw err
        }
}

const deleteItem = async({id}) => {
    try{
        const {rows: order} = await client.query(`
            DELETE FROM orderDetails
            WHERE "id" = $1
            RETURNING *;
        `, [id])

        return order;
    }catch(error){
        throw error;
    }
}

module.exports ={ 
    addProductToOrder,
    getOrderByDate,
    updateQuantity,
    deleteItem
    
}