import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';

class ProductItem extends Component{
    state={
        cek: false
    }

    onClickCart = (id) => {
        if (this.props.username !== "") {
            const nilai = parseInt(this.angka.value)
            if (nilai !== 0) {
                axios.get("http://localhost:1996/product/", {
                    params: {
                        id
                    }
                }).then(res => {
                    axios.get(`http://localhost:1996/cart`, {
                        params: {
                            productId: id,
                            username: this.props.username
                        }
                    }).then(resCart => {
                        if (resCart.data.length === 0) {
                            axios.post("http://localhost:1996/cart", {
                                productId: res.data[0].id,
                                username: this.props.username,
                                quantity: nilai,
                                name: res.data[0].name,
                                desc: res.data[0].desc,
                                price: parseInt(res.data[0].price),
                                src: res.data[0].src,
                            }).then(res => {
                                console.log(res.data);

                            })
                        } else if (resCart.data.length > 0) {
                            const newNilai = parseInt(resCart.data[0].quantity) + nilai
                            console.log(newNilai);
                            console.log(res.data[0].name);
                            console.log(res.data[0].id);
                            console.log(res.data[0].price);
                            console.log(res.data[0].desc);
                            console.log(res.data[0].src);
                            console.log(resCart.data[0].name);
                            console.log(resCart.data[0].productId);
                            console.log(resCart.data[0].id);
                            console.log(resCart.data[0].price);
                            console.log(resCart.data[0].desc);
                            console.log(resCart.data[0].src);
                            axios.put(`http://localhost:1996/cart/${resCart.data[0].id}`, {
                                productId: resCart.data[0].productId,
                                username: this.props.username,
                                quantity: newNilai,
                                name: resCart.data[0].name,
                                desc: resCart.data[0].desc,
                                price: parseInt(resCart.data[0].price),
                                src: resCart.data[0].src,
                            })
                        }
                    })
                })
            } else {
                return alert("Jumlah Order Minimal adalah 1")
            }
        } else {
            this.setState({ cek: !this.state.cek })
        }
    }

    render(){
        const {item} = this.props//ambil objek item yg dilempar dari home
        return (
            <div className="card col-3 m-3 p-2" style={{ width: "18rem" }}>
                <img src={item.src} className="card-img-top" alt={item.name} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.desc}</p>
                    <p className="card-text">Rp.{item.price.toLocaleString("in")}</p>
                    <input className="form-control text-right" ref={input => (this.angka = input)} defaultValue="1" min="0" type="number" />
                    <Link to={"/detailproduct/" + item.id}><button className="btn btn-secondary btn-block btn-sm my-2">Detail</button></Link>
                    <button onClick={()=>{this.onClickCart(item.id)}} className="btn btn-primary btn-block btn-sm my-2">Add to Cart</button>
                    {this.state.cek === true ? <Redirect to ="/login"/>:null}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        username: state.auth.username
    }
}
export default connect(mapStateToProps) (ProductItem)