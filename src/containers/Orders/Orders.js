
import React, { Component } from 'react';
import axios from "../../services/axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios.get('orders.json').then(res => {
      const fetchedOrders = [];
      for (const key in res.data) {
        fetchedOrders.push({ ...res.data[key], id: key });
      }
      this.setState({ loading: false, orders: fetchedOrders });
    }).catch(err => {
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order key={order.id}
            ingridients={order.ingridients}
            price={order.price} />;
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);