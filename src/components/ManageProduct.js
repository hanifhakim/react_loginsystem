import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
// import {onAddProd} from '../actions'


class ManageProduct extends Component{

    state ={
        products: []
    }

    componentDidMount(){
        this.getProduct()
    }

    //butuh fn untuk ambil ke database (utk update data misal diinput, edit)
    getProduct=()=>{
        axios.get("http://localhost:1996/product")
        .then(res => {
            this.setState({products: res.data})
        })
    }

    addProduct = () => {
        const namanya = this.name.value
        const descnya = this.desc.value
        const pricenya = this.price.value
        const pictnya = this.pict.value

        console.log(namanya);
        console.log(descnya);
        console.log(pricenya);
        console.log(pictnya);
        this.onAddProd(namanya, descnya, pricenya, pictnya)
        
    }
    // commenku

    onAddProd = (namanya, descnya, pricenya, pictnya) => {
          axios.post("http://localhost:1996/product",{
            name: namanya,
            desc: descnya,
            price: pricenya,
            src: pictnya
          }).then(res => {
            this.getProduct()
          }) 
        
      }

    onDelete = (i) => {
        axios.delete(`http://localhost:1996/product/${i}`).then(res => {
            this.getProduct()
          })
    }  
    renderList = () => {
        return this.state.products.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td><img className="list" src={item.src} alt={item.desc}></img></td>
                    <td>
                        <button className="btn btn-primary mr-2">Edit</button>
                        <button onClick={() => {this.onDelete(item.id)}}className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }
    
    render(){
        if(this.props.user !== ""){
            return(
                <div className="container">
                    <h1 className="display-4 text-center">ManageProduct</h1>
                    <table className="table table-hover mb-5">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderList()}
                            </tbody>
                        </table>
                        <h1 className="display-4 text-center">input Product</h1>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                                    <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                                    <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                                    <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                                    <th scope="col"><button onClick={this.addProduct} className="btn btn-outline-warning" >Add</button></th>
                                </tr>
                            </tbody>
                        </table>
                </div>
            )
        } else {
            return <Redirect to="/"/>
        }
        
    }
}

const mapStateToProps = state => {
        return{user: state.auth.username}
}
export default connect (mapStateToProps)(ManageProduct)