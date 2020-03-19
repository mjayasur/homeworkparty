import React from 'react';
import Navbar from './Navbar';
import TextChat from './TextChat';

class Room extends React.Component {
  constructor() {
    super();

  }

  render() {
    console.log(this.props.user)
    return (
        <div>
            <Navbar > </Navbar>
            <TextChat socket = {this.props.socket} room = {this.props.room} user = {this.props.user}/>
        </div>
    );
  }

  componentDidMount() {
    this.props.socket.emit('join-room', this.props.room)
  }
}

export default Room;
