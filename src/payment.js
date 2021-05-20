import React , {useEffect, useState}from 'react';
import "./payment.css";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import CheckoutProduct from './CheckoutProduct';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import CurrencyFormat from "react-currency-format";

import { getBasketTotal } from "./reducer";
import { Link, useHistory } from "react-router-dom";
import axios from './axios';


function Payment (){

    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("")

    const [error, setError] = useState(null);
    const [disabled, setDisabled]= useState(true);
    const [clientSecret,setClientSecret] = useState(true);

    useEffect ( () => {
        // generate the secial strpe secret which allows us to chare customer 
        
        const getClientSecret = async () => {
            const response = await axios({
                method : 'post',
                urls :`/payments/create?total = ${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();

    },[basket])

 console.log('the secret is ', clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method : {
                card : elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) =>{
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            history.replace('/orders!')
        }) 


    }
    const handleChange = event => {

            setDisabled(event.empty);
            setError(event.error ? event.error.message: "");
        // do all the fancy stripe sufff

    }

    return(
        <div className="payment">

            <div className="payment_container">
                <div className="payment_section">
                    <div className="payment_title"> 
                        <h1>DElivery Address</h1>

                    </div>
                    <div className="payment_item">
                        <p>{!user ? 'Guest' : user.email}</p>
                        <p>shreeji society sikka</p>
                        <p>jamnagar 373636</p>
                    </div>
                </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h2>Review Your {basket.length} item</h2>
                    </div>
                    <div className="payment_item">
                        {basket.map(item=>(

                                <CheckoutProduct
                                    id={item.id}
                                    title={item.id}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />

                        ))
                            
                        }
                    </div>

                </div>

                <div className="payment_section">
                        
                        <div className="payment_title">
                            <h1>Payment method</h1>

                        </div>
                    <div className="payment_details">
                            <form onSubmit={handleSubmit}>
                                <CardElement  onChange={handleChange}/>
                                <div className="payment_price">
                                    
                                <CurrencyFormat
                                    renderText={(value) => (
                                <h3>Order Total : {value}</h3>

                            )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        //value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

                    <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p> Processing</p> : "Buy Now"}</span>  
                                    
                            </button>
                                 </div>
                                 {error && <div>{error}</div>}
                            </form>
                         
                    </div>

                  </div>


            </div>
        </div>
    )
}

export default Payment
