import React, { Component } from 'react';
import CheckoutSummary from "../../components/checkoutSummary/checkoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingridients: null,
        totalPrice: 0
    };
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingridients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingridients[param[0]] = +param[1];
            }
        }

        this.setState({ ingridients: ingridients, totalPrice: price });
    }

    render() {
        return (<div>
            <CheckoutSummary
                ingridients={this.state.ingridients}
                checkoutCancelled={this.checkoutCancelHandler}
                checkoutContinued={this.checkoutContinueHandler}
            />
            <Route
                path={this.props.match.path + '/contact-data'}
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
        </div>);
    }
}

export default Checkout;