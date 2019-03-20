import React, {Component} from 'react'

import axios from 'axios'
import ProductItem from './ProductItem';
// import {searchName} from '../actions'
// import {connect} from 'react-redux'
// sampesini
class Home extends Component {
    state={
        products:[],
        productSearch:[],
        results:[]
    }

    componentDidMount(){
        // console.log('didmount');
        
        this.getProduct()
    }

    getProduct=()=>{
        axios.get("http://localhost:1996/product")
        .then(res => {
            this.setState({products: res.data, productSearch: res.data})
        })
    }

    onBtnSearch = () => {
        const name = this.name.value
        const min = parseInt(this.min.value)//string kosong di parseInt menghasilkan NaN
        const max = parseInt(this.max.value)

        var arrSearch = this.state.products.filter(item => {
            if (isNaN(min) && isNaN(max)) {// search hanya dengan name , min dan max kosong
                return (

                    // [Hoodie]
                    // item.name = Hoodie, item.name.toLowerCase()= hoodie

                    // name=HOODie, name.toLowerCase()=hoodie
                    item.name.toLowerCase().includes(name.toLowerCase())
                    // hoodie.includes(hoodie) => true, masuk ke arrah filter
                )
            } else if (isNaN(min)) {
                return (
                    item.name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price <= max
                )
            } else if (isNaN(max)) {
                return (
                    item.name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price >= min
                )
            } else {
                return (
                    item.name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price <= max &&
                    item.price >= min
                )
            }

        })

        this.setState({ productSearch: arrSearch })

    }
   
    renderList=()=>{
        return this.state.productSearch.map((item2,i) => {
            return(
                <ProductItem item={item2} key={i}/>//key supaya tiap item punya keunikan id
            )
        })
    }

    renderList2 = () =>{
        return this.state.results.map((item3,i) => {
            return(
                <ProductItem item={item3} key={i}/>//key supaya tiap item punya keunikan id
            )
        })
    }
    render(){
        // console.log(this.state.results);

        return (
            <div className="row">
                <div className="col-2">
                    <div className="mt-3 ml-1 row">
                        <div className="mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>Search</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Name</h4>
                                </div>
                                <form className="input-group"><input onChange={this.onBtnSearch} ref={input => this.name = input} className="form-control" type="text" /></form>
                                <div className="card-title mt-1">
                                    <h4>Price</h4>
                                </div>
                                <form className="input-group"><input onChange={this.onBtnSearch} placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                <form className="input-group"><input onChange={this.onBtnSearch} placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-10 row">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default Home

// Search Lawas
// onSearchName = (event) => {
//     event.preventDefault()
//     const name = this.username.value
//     // console.log(name);
    
//     this.searchName(name)
// }
// searchName = (input) => {
    
//       axios.get('http://localhost:1996/product',{
//         params:{
//           name: input
//         }
//       }).then((res)=>{
//         console.log(res.data[0]);
//         this.setState({results: res.data})
//         console.log(this.state.results);
        
        
//       }).catch(err=>{
//         console.log("can't find the data");
        
//       })
//     }
  

