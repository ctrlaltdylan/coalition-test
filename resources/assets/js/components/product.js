import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

class Product extends React.Component {

	constructor() {
		this.state = {
			product : '',
			quantity : 0,
			price: "0.00",
			products: []
		}
	}

	componentDidMount() {
		this.retrieveProducts();
	}

	retrieveProducts() {

		request
			.get('/api/product')
			.end((err, res) => {
				this.setState({
					products: res
				})
			});
	}

	renderProducts() {
		this.state.products.map((product) =>  { 
			<Product props={props}/> 
		})
	}	


	submit(e) {
		e.preventDefault();

		request
		  .post('/api/product')
		  .send( 
		  	this.state
		  )
		  .set('Accept', 'application/json')
		  .end((err, res) => {

		  	this.retrieveProducts();
		  });
	}

	onChangeProduct(e) {
		this.setState({
			'product' : e.value
		})
	}

	onChangeQuantity(e) {
		this.setState({
			'quantity' : e.value
		})
	}

	onChangePrice(e) {
		this.setState({
			'price' : e.value
		})
	}

	render() {
		return (
			<div className="container">
	            <div className="row">
	                <form  onSubmit={this.submit.bind(this)}>
	                    <div className="form-group">
	                        <label>Product Name</label>
	                        <input type="text" name="name" className="form-control" onChange={this.onChangeProduct.bind(this)} value={this.state.name} />
	                    </div>
	                    <div className="form-group">
	                        <label>Quantity in Stock</label>
	                        <input type="text" name="quantity" className="form-control" onChange={this.onChangeQuantity.bind(this)} value={this.state.quantity} />
	                    </div>
	                    <div className="form-group">
	                        <label>Price per Item</label>
	                        <input type="text" name="price" className="form-control" onChange={this.onChangePrice.bind(this)} value={this.state.price} />
	                    </div>
	                    <button className="btn btn-primary">
	                        Submit
	                    </button>
	                </form>
	            </div>
	            <div className="row">
	                <table id="product_table" className="table table-striped">
	                    <thead>
	                        <tr>
	                            <th>Product Name</th>
	                            <th>Quantity in stock</th>
	                            <th>Price per item</th>
	                            <th>Datetime submitted</th>
	                            <th>Total value number</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                    	{ this.renderProducts }
	                    </tbody>
	                </table>
	            </div>
			</div>
		)
	}
}

ReactDOM.render(
	<Product />,
	document.getElementById('root')
);