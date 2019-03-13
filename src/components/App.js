import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import Header from './Header'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import ManageProduct from './ManageProduct'
import {keepLogin} from '../actions'

const cookie = new cookies()

class App extends Component{
    // LIFE CYCLE HOOK/METHOD
    // componentdidmount (dijalankan sekali ketika pertama kali komp di render (setelah render))
    
    componentDidMount(){
        // mengambil value yang disimpan pada file cookie masihLogin
        var userCookie = cookie.get('masihLogin')
          // jika didapatkan username di file cookie, akan memanggil function keepLogin
            if(userCookie !== undefined){
                 // function keepLogin akan me-loginkan ulang username yg tersimpan pada file cookie
                this.props.keepLogin(userCookie)
            }
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/manageproduct" component={ManageProduct}/>
                </div>
            </BrowserRouter> 
        )
    }
}
export default connect (null, {keepLogin}) (App)