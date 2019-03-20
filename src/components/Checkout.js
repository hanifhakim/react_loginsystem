import React, { Component } from 'react';

class Checkout extends Component{

    renderList = () => {
        return this.props.dariCart.map((item)=>{
            return (
                <tr key={item.id}>
                    <td>{item.productId}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{`Rp.${item.price.toLocaleString("in")}`}</td>
                    <td>{`Rp.${(item.price*item.quantity).toLocaleString("in")}`}</td>
                </tr>
            )
    
        })
    }

    loopTotal = () => {
        var total = 0
        // console.log(this.props.dariCart.price);
        
        for(let i =0; i<this.props.dariCart.length; i++){
            total += this.props.dariCart[i].price*this.props.dariCart[i].quantity
        }
        return total.toLocaleString("in")
    }

    render(){

        return (
            <div className="container">
                <h1 className="display-4 text-center">Total</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">QTY</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                        <tr>
                        <td colSpan='4'><strong>TOTAL :</strong></td>
                        <td>{`Rp.${this.loopTotal()}`}</td>
                        </tr>
                        {/* <Checkout dariCart={this.state.cartLocal} /> */}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Checkout
