import React, { useState, useEffect}  from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';


const promise = loadStripe(
  "pk_test_51IqNrgSCHKvhxqmO7hCdhFXSbr0Vc7Mm7uHNhSRkuPm2I5zNl4R2kYwEgW2opSBg1EZgcBL1lNJfWUL8VMS3YYOf00MNBwvVtG"
)


function App() {

  
  const [{ basket, user }, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (

    <Router> 
        <div className="App">
        
          <Switch> 
              <Route path ="/checkout">
              <Header /> 
              <Checkout />
                
                
              </Route>
              <Route path="/login">
            <Login />
            </Route>

            <Route path ="/payment">

                <Header />
                <Elements stripe={promise}>
                <Payment />
                </Elements>                
                
              </Route>

              {/*this is default path */}
              <Route path ="/">
                <Header />
                <Home />
                
              </Route>

              
            </Switch>
       </div>
    </Router>
      );
}

export default App;
