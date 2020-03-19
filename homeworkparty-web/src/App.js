import React from 'react';
import './App.css';
import Navbar from './Navbar';
import GetDisplayName from './GetDisplayName';
import openSocket from 'socket.io-client';
import AllRooms from './AllRooms';
import Room from './Room';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName : "",
      page : 0,
      socket : null,
      room : ""
    }
  }

  getDisplayName = (name) => {

    this.setState({
      displayName : name,
      page : 1
    })
    
  }
  joinRoom = (room) => {
    this.setState({
      room, page : 2
    })
    
  }

  
  render () {
    if (this.state.page === 0) {
      return (
      
        <div className="App">
            <div className = "mb-5">
            <Navbar/>
          </div>
          <div className = "mt-5">
            <GetDisplayName getDisplayName = {this.getDisplayName}/>
          </div>
        </div>
      );        
    } else if (this.state.page === 1) {
      return (
        <AllRooms socket={this.state.socket} joinRoom = {this.joinRoom}/>
      );
    } else if (this.state.page === 2) {
      return (
        <Room socket={this.state.socket} room={this.state.room} user={this.state.displayName} />
      );
    }

  }
  componentDidMount() {
    let socket = openSocket('54.153.14.29:3001/')
    this.setState({
        socket,

    })
  }

}

export default App;
