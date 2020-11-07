import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import {set_data,facebook_login} from '../store/action'
import 'bootstrap/dist/css/bootstrap.min.css'



class  Home extends React.Component{


  render(){
  // console.log(this.props)
  let user = {name: "Umair", email:"umair@gmail.com" }
  
  

  return (
    <div>
      <div className="container w-50 text-center rounded bg-light border border-primary p-5 mt-5">
        <h3 className="text-secondary" >WELCOME TO FIRE BASE CHAT APP</h3>
      {/* <button onClick={()=>this.props.set_data(user)}>SETDATA</button> */}
      <div className="text-center mt-5">
      <button className="btn btn-primary btn-lg " onClick={()=>this.props.facebook_login(this.props.history)}>FACEBOOK LOGIN</button>
      </div>
      </div>
    </div>
  );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
  
})

const mapDispatchToProp =(dispatch)=> ({
    set_data: (data)=> dispatch(set_data(data)),
    facebook_login: (history)=> dispatch(facebook_login(history))
  })

export default connect (mapStateToProps,mapDispatchToProp)(Home);
