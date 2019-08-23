import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SingleProductView extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`/item/${id}`)
      .then(res => {
        return res.json();
      })
      .then(item => {
        console.log(item);
        this.setState({ item });
      })
      .catch(err => {
        console.error('Error is:', err);
      });
  }
  constructor() {
    super();
    this.state = {
      item: null,
    };
  }
  render() {
    const { item } = this.state;
    return (
      <div className="item-container">
        {item ? (
          <div id="single-item">
            <div id="seller-and-back">
              <Link to="/">{'< Home'}</Link>
              <div id="single-item-seller">
                <h4>{item.seller.company}</h4>
              </div>
            </div>
            <div id="single-item-image">
              <img alt={item.title} src={item.image} />
              <div id="single-item-like">
                <p>Love</p>
              </div>
            </div>
            <div id="single-item-sale-info">
              <p id="single-item-name">{item.name}</p>
              <p id="single-item-price">
                {item.price ? item.price.amounts.USD : 'Price Upon Request'}
              </p>
              <p id="single-item-measurements">
                Measurements:
                <br />
                {item.measurements.display}
              </p>
            </div>
            <button>Purchase</button> <button>Make Offer</button>
            <div id="single-item-info">
              <p id="single-item-description">{item.description}</p>
              <p id="single-item-creator">Creator: {item.creators}</p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
