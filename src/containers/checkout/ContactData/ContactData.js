import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../services/axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingridients: this.props.ingridients,
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
        this.setState({ loading: false });
        this.props.history.push('/');
      });
  };
  render() {
    let form = (<form>
      <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
      <input className={styles.Input} type="email" name="email" placeholder="Your Email" />
      <input className={styles.Input} type="text" name="street" placeholder="Street" />
      <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>);
    if (this.state.loading) {
      form = (<Spinner />);
    }
    return (<div className={styles.ContactData}><h4>Enter your contact data</h4>
      {form}
    </div>);
  }
}

export default ContactData;