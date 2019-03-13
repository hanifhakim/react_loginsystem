import React, { Component } from "react";

import { Link,Redirect } from "react-router-dom";
import {onRegist} from '../actions'
import {onTimeOut} from "../actions"
import {connect} from 'react-redux'

class Register extends Component {
    onRegistClick = () => {
    const user = this.username.value;
    const email = this.email.value;
    const pass1 = this.password1.value;
    const pass2 = this.password2.value;

      if(pass1 !== pass2){
        alert("password tidak cocok")
        this.password1.value = ""
        this.password2.value = ""
      } else {
        this.props.onRegist(user, email, pass1)
      }

    console.log(user);
    console.log(email);
    console.log(pass1);
   
    
    }



    onRegistError = () => {
    if(this.props.error !== ""){
      setTimeout((this.props.onTimeOut), 2000)
      return (
        <div className="alert alert-danger mt-2" role="alert">
            {this.props.error}
        </div>
        
      )
    } else if (this.props.success !==""){
      // setTimeout((this.props.onTimeOut), 2000) Ini ada 2 cara, bisa diatur disini atau di act creat
      return (
        <div className="alert alert-success mt-2" role="alert">
            {this.props.success}
            <Redirect to="/login"/>
        </div>
      )
    } else {
      return null
    }
    }


    // onRegistSuccess = () => {
    //   if(this.props.success !== ""){
    //     return (
    //       <div className="alert alert-success mt-2" role="alert">
    //           {this.props.success}
    //       </div>
    //     )
    //   } else {
    //     return null
    //   }
    // }
 
    render() {
    return (
      <div>
        <div className="mt-5 row">
          <div className="col-sm-3 mx-auto card">
            <div className="card-body">
              <div className="border-bottom border-secondary card-title">
                <h1>Register</h1>
              </div>
              <div className="card-title mt-1">
                <h4>Username</h4>
              </div>
              <form className="input-group">
                <input
                  ref={input => {
                    this.username = input;
                  }}
                  className="form-control"
                  type="text"
                />
              </form>
              <div className="card-title mt-1">
                <h4>E-mail</h4>
              </div>
              <form className="input-group">
                <input
                  ref={input => {
                    this.email = input;
                  }}
                  className="form-control"
                  type="email"
                />
              </form>
              <div className="card-title mt-1">
                <h4>Password</h4>
              </div>
              <form className="input-group">
                <input
                  ref={input => {
                    this.password1 = input;
                  }}
                  className="form-control mr-1"
                  type="password"
                />
                <input
                  ref={input => {
                    this.password2 = input;
                  }}
                  className="form-control ml-1"
                  type="password"
                  placeholder="re-type pass"
                />
              </form>
              <button
                className="btn btn-success btn-block mt-5"
                onClick={this.onRegistClick}
              >
                Register
              </button>
              {this.onRegistError()}
              {/* {this.onRegistSuccess()} */}
              <p className="lead">
                Do you have account ? <Link to="/login">Sign In!</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{error: state.auth.error,
          success: state.auth.success}
}

export default connect (mapStateToProps, {onRegist, onTimeOut})(Register);
