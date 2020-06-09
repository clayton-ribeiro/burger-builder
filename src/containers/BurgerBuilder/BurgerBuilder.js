import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../services/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  purshaseHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchasable(ingridients) {
    const sum = Object.keys(ingridients)
      .map((igKey) => ingridients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngridientHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    const updatedCount = oldCount + 1;
    const updatedIngridients = {
      ...this.state.ingridients,
    };

    updatedIngridients[type] = updatedCount;

    const priceAddition = INGRIDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingridients: updatedIngridients });
    this.updatePurchasable(updatedIngridients);
  };

  removeIngridientHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngridients = {
      ...this.state.ingridients,
    };

    updatedIngridients[type] = updatedCount;

    const priceDeduction = INGRIDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingridients: updatedIngridients });
    this.updatePurchasable(updatedIngridients);
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purhaseContinueHandler = () => {
    //alert("You continue!");
    this.setState({ loading: true });
    const order = {
      ingridients: this.state.ingridients,
      price: this.state.totalPrice,
      custumer: {
        name: "Clayton",
        address: {
          street: "Test",
          zipCode: "1234",
          country: "Brasil",
        },
        email: "clayton.julio@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ loading: true, purchasing: false });
      });
  };

  render() {
    const disableInfo = { ...this.state.ingridients };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchasedContinued={this.purhaseContinueHandler}
        ingridients={this.state.ingridients}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingridients={this.state.ingridients} />
        <BuildControls
          ordered={this.purshaseHandler}
          ingridientsAdded={this.addIngridientHandler}
          ingridientsRemoved={this.removeIngridientHandler}
          purchasable={this.state.purchasable}
          disabled={disableInfo}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
