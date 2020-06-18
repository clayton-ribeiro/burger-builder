import React, { Component } from 'react';
import CheckoutSummary from "../../components/checkoutSummary/checkoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingridients: {}
    };
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingridients = {};
        for (let param of query.entries()) {
            ingridients[param[0]] = +param[1];
        }

        this.setState({ ingridients: ingridients });
    }

    render() {
        return (<div>
            <CheckoutSummary
                ingridients={this.state.ingridients}
                checkoutCancelled={this.checkoutCancelHandler}
                checkoutContinued={this.checkoutContinueHandler}
            />
            <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
        </div>);
    }
}

export default Checkout;