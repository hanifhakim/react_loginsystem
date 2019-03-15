import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
// import {onAddProd} from '../actions'


class ManageProduct extends Component{

    state ={
        products: [],
        selectedId: 0
    }

    componentDidMount(){
        this.getProduct()
    }

    //butuh fn untuk ambil ke database (utk update data misal diinput, edit)
    getProduct=()=>{
        axios.get("http://localhost:1996/product")
        .then(res => {
            this.setState({products: res.data, selectedId:0})
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
            this.name.value=""
            this.desc.value=""
            this.price.value=""
            this.pict.value=""
          }) 
        
      }

    onDelete = (i) => {
        axios.delete(`http://localhost:1996/product/${i}`).then(res => {
            this.getProduct()
          })
    }  

    onEdit = (i) => {
        this.setState({selectedId: i})
    }
   
    onSaveItem = (i) => {
        const nama = this.editName.value
        const desk = this.editDesc.value
        const harga = parseInt(this.editPrice.value)
        const sumber = this.editImg.value
        axios.put('http://localhost:1996/product/' + i, {
            name: nama,
            desc: desk,
            price: harga,
            src:sumber
        }).then(() => {
            this.getProduct()
        })
    }

    renderList = () => {
        return this.state.products.map((item,i) => {
           if(item.id !== this.state.selectedId){
            return (
                <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td><img className="list" src={item.src} alt={item.desc}></img></td>
                    <td>
                        <button onClick ={() => {this.onEdit(item.id)}}className="btn btn-primary mr-2">Edit</button>
                        <button onClick={() => {this.onDelete(item.id)}}className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
           } else {
               return (
                   <tr key={item.id}>
                       <td>{item.id}</td>
                       <td>
                           <input className="form-control" ref={input => { this.editName = input }} type="text" defaultValue={item.name} />
                       </td>
                       <td>
                           <input className="form-control" ref={input => { this.editDesc = input }} type="text" defaultValue={item.desc} />
                       </td>
                       <td>
                           <input className="form-control" ref={input => { this.editPrice = input }} type="text" defaultValue={item.price} />
                       </td>
                       <td>
                           <input className="form-control" ref={input => { this.editImg = input }} type="text" defaultValue={item.src} />
                       </td>
                       <td>
                           <button onClick={() => { this.onSaveItem(item.id) }} className="btn btn-primary mb-2">Save</button>
                           <button onClick={() => { this.setState({ selectedId: 0 }) }} className="btn btn-danger">Cancel</button>
                       </td>
                   </tr>
               )
           }
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