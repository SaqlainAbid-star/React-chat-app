import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { get_users } from '../store/action'
import firebase from '../config/firebase'
import 'bootstrap/dist/css/bootstrap.min.css'




class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            chat_user: {},
            chats: [],
            message: ""
        }
    }

    get_messages = (uid) => {
        firebase.database().ref('/').child(`chats/${uid}`).on('child_added', (messages) => {
            this.state.chats.push(messages.val())
            this.setState({
                chats: this.state.chats
            })
        })
    }


    componentDidMount() {
        this.props.get_users()
    }

    uid_merge(uid1, uid2) {
        if (uid1 < uid2) {
            return uid1 + uid2
        }
        else {
            return uid2 + uid1
        }
    }



    send_message = () => {
        let current_user = this.props.current_user;
        let chat_user = this.state.chat_user;
        let merge_uid = this.uid_merge(current_user.uid, chat_user.uid)


        firebase.database().ref('/').child(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: current_user.name,
            uid: current_user.uid
        })
        // this.state.chats.push({
        //     message: this.state.message
        // })
        this.setState({
            chats: this.state.chats,
            message: ""
        })
    }

    chat = (user) => {
        this.setState({
            chat_user: user
        })
        let current_user = this.props.current_user;
        let merge_uid = this.uid_merge(current_user.uid, user.uid)
        this.get_messages(merge_uid)

    }

    render() {
        let user = this.props.current_user;
        //   console.log("firebase users:",this.props.users)

        return (
            <div className="jumbotron">
                <div className="row">

                    <div className="col-5 mr-2">
                        <div className="row">

                            <div className="col-12 p-3 mb-2  user border border-dark rounded">
                                <h4>Welcome To Chat App</h4>
                               
                                <h3> <img src={user.profile}></img> {user.name}</h3>
                                <h6>Email: {user.email}</h6>
                            </div>

                            <div className="col-12 p-3 chatuser border border-dark rounded">
                                <div>
                                    <div>
                                        <h4>Chat With Friends:</h4>

                                        <ul>
                                            {this.props.users.map((v, i) => {
                                                return v.uid !== user.uid && <li key={i}>
                                                    <h5>
                                                    <img src={v.profile} alt="" width="30" />
                                                     {v.name}   <button className="btn btn-primary" onClick={() => this.chat(v)}>Chat</button> </h5></li>
                                            })}
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>


                    <div className="col-6 border border-dark rounded p-3 ">

                    <div >
                

                        {Object.keys(this.state.chat_user).length ?
                            <div>
                                <h4><img src={this.state.chat_user.profile} alt="" width="40" /> {this.state.chat_user.name}</h4>
                                <ul>
                                    {this.state.chats.map((v, i) => {
                                        return <li style={{ color: v.uid === user.uid ? "black" : "royalblue" }} key={i}><h5>{v.message}</h5></li>
                                    })}
                                </ul>
                                <div className="input-group input mb-3 border rounded">
                                <input  class="form-control"  value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} type="text" placeholder="Type a message" />
                                <button class="btn btn-primary" onClick={() => this.send_message()}>Send</button>
                                </div>


                            </div>
                            :
                            <h4></h4>

                        }

                    </div>

                    </div>


                    </div>
            </div>

        )
    }
}


const mapStateToProps = (state) => ({
    current_user: state.current_user,
    users: state.users

})

const mapDispatchToProp = (dispatch) => ({
    get_users: () => dispatch(get_users())
})

export default connect(mapStateToProps, mapDispatchToProp)(Chat);