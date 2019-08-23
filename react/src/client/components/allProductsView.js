import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllProductsView extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      itemsDisplayed: 0,
      totalItems: 0,
    };
  }

  componentDidMount() {
    fetch('/browse')
      .then(res => res.json())
      .then(items => {
        this.setState({
          ...items,
          totalItems: items.totalItems,
          itemsDisplayed: this.state.itemsDisplayed + items.items.length,
        });
      })
      .catch(err => console.error('Error is:', err));
  }

  loadMore = () => {
    let { itemsDisplayed, totalItems } = this.state;
    const itemsLeft = totalItems - itemsDisplayed;
    let start = itemsDisplayed;
    let limit = 9;

    if (itemsDisplayed < totalItems) {
      if (itemsLeft < 9) limit = itemsLeft;
      fetch(`/browse?start=${start}&limit=${limit}`)
        .then(res => res.json())
        .then(newItems => {
          this.setState({
            items: [...this.state.items, ...newItems.items],
            itemsDisplayed: itemsDisplayed + newItems.items.length,
          });
        })
        .catch(err => console.error('Error is:', err));
    }
  };

  render() {
    return (
      <div className="container-all-items">
        <h3 id="centered-title">Browse Page</h3>
        {this.state.items ? (
          <div className="items">
            {this.state.items.map(item => {
              return (
                <div className="item" key={item.id}>
                  <Link to={`/browse/item/${item.id}`}>
                    <img alt={item.title} src={item.image} />
                  </Link>
                  <div className="price">
                    {item.price ? (
                      <React.Fragment>{item.price.amounts.USD}</React.Fragment>
                    ) : (
                      <p>Price Upon Request</p>
                    )}
                  </div>

                  <div id="favorite-button">
                    <p>Love</p>
                  </div>
                </div>
              );
            })}
            {this.state.itemsDisplayed === this.state.totalItems ? (
              ''
            ) : (
              <button onClick={this.loadMore}>Load More</button>
            )}
          </div>
        ) : (
          <div className="empty">
            <p>There are no items available at the moment.</p>
          </div>
        )}
      </div>
    );
  }
}
