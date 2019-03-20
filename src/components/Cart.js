import React, { Component } from 'react';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import Checkout from './Checkout'
import cookies from 'universal-cookie'


const cookie = new cookies ()

class Cart extends Component {
    state = {
        cartLocal:[],
        sip: false
    }

    getCart = () => {
        var username = cookie.get("masihLogin")
        axios.get(`http://localhost:1996/cart`,{
            params:{
                username
            }
        }).then(res =>{
            console.log(res.data);
                
            this.setState({cartLocal: res.data})
            console.log(this.state.cartLocal);
            
        })
    }
    componentDidMount(){
        this.getCart()
    }

    onDeleteCart = (id) => {
        axios.delete("http://localhost:1996/cart/" + id).then(res=>{
            this.getCart()
        })
    }
    onClickCheckout = () => {
        this.setState({sip: !this.state.sip})
        
    }

    renderList = () => {
        return this.state.cartLocal.map((item)=>{
            return (
                <tr key={item.id}>
                    <td>{item.productId}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{`Rp.${item.price.toLocaleString("in")}`}</td>
                    <td>{item.quantity}</td>
                    <td><img className="list" src={item.src} alt={item.desc}></img></td>
                    <td>
                        <button onClick={() => {this.onDeleteCart(item.id)}}className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }
    render() {
        if (cookie.get("masihLogin") !== undefined) {
            if (this.state.cartLocal.length !== 0) {
                return (
                    <div>
                        <div className="container text-center">
                            <h1 className="display-4 text-center">Cart</h1>
                            <table className="table table-hover mb-5">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">NAME</th>
                                        <th scope="col">DESC</th>
                                        <th scope="col">PRICE</th>
                                        <th scope="col">QTY</th>
                                        <th scope="col">PICTURE</th>
                                        <th scope="col">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderList()}
                                </tbody>
                            </table>
                            <button onClick={() => { this.onClickCheckout() }} className="btn btn-primary btn-sm my-2">Checkout</button>
                            {this.state.sip === true ? <Checkout dariCart={this.state.cartLocal} /> : null}
                        </div>


                    </div>
                )
            } else {
                return (
                    <div>
                        <h3 className="display-5 text-center">Silakan lihat katalog kami di <Link to='/'> All Product </Link></h3>
                    </div>
                )
            }
        } else {
            return <Redirect to="/" />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}
export default connect(mapStateToProps) (Cart)