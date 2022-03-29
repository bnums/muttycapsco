import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { ProductImage, ProductInfo } from ".";
import "../style/Cart.css";


const Cart = () => {

    // const commerce = new Commerce(JWT_SECRET);

    const [cart, setCart] = useState()

    // useEffect(() => {
    //     commerce.cart.retrieve()
    //         .then(res => {
    //             setCart(res)
    //         })
    // },[])

    // const addToCart = (productId, variantInfo) => {

    //     if(variantInfo) {
    //         commerce.cart.add(productId, 1, variantInfo)
    //             .then(res => {
    //                 setCart(res.cart)
    //             })
    //     } else {
    //         window.alert('Please Select a Color')
    //     }
    // }



    return(
        <div className="content">
            <div className="row">
                {/* ===== LEFT SIDE: PRODUCTS IN BAG ===== */}
                <div className="col1">
                    <h1>Shoppping Cart</h1>
                    <div className="">
                        <div className='description'>
                            <div className='single-product-line'>
                                <div className='product-image'>
                                     <ProductImage></ProductImage>
                                </div>
                               <div className="productOrder-description">
                                    <div className='productOrder-name'>
                                        <h3>Product Name</h3>
                                    </div>
                                    <div className="product-quantity">
                                        <p>Quantity: 4</p>
                                    </div>
                                    <div className="icons">
                                        <FontAwesomeIcon icon={faHeart} />
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </div>
                               </div>
                               <div className="product-price">
                                    <p>$10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ===== RIGHT SIDE: SUMMARY DETAILS ===== */}
                <div className="col2">
                    <div className="summary">
                        <h1>Summary</h1>
                            <div className="pricing-breakdown">
                                <div className="subtotal">
                                    <p>Subtotal: </p><span className="">$20.99</span>
                                </div>
                                <div className="estimated-shipping">
                                        <p>Estimated Shipping<FontAwesomeIcon icon={faCircleQuestion} />: </p> <span className="">$1.50</span>
                                </div>    
                                <div className="estimated-tax">
                                    <p>Estimated Tax: </p><span className="">$1.45</span>
                                </div>    

                            </div>
                            <div className="orderTotal">
                                <p>Total: </p><span>$65.99</span>
                            </div>
                            <button className=""><Link to="">Checkout</Link></button>
                    </div>    
                </div>
            </div>    
        </div>
    )
}

export default Cart;