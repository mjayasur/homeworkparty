import React from 'react';
import Navbar from './Navbar';
import axios from 'axios'
import CreateRoom from './CreateRoom';

class AllRooms extends React.Component {
  constructor() {
    super();
    this.state = {
        loading : true,
        rooms : [],
        roomHTML : [],
        page : 0
    }

  }

  createRoom = (room) => {

    this.props.socket.emit("create-room", room);


    axios.get('http://54.153.14.29:3001/rooms')
    .then( (response) => {
      console.log(response);
      this.setState({
          rooms : response.data
      })
      this.setState({
          roomHTML : []
      })
      response.data.forEach((room) => {
          this.setState({
              roomHTML : [...this.state.roomHTML, 
                  <li class="list-group-item mt-2">{room} <button className="btn btn-outline-success float-right" > Join Room</button></li>]
          })
          
      })  
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      
    });
    this.setState({
        page : 0
    })
  }
  

  render() {
    if (this.state.loading) {
        return <div></div>;
    }
    if (this.state.page === 1) {
        return (<CreateRoom createRoom = {this.createRoom}/>);
    }
    return (
        <div>
            <Navbar />

            <div className = "container mt-5">
                <div className = "container row mt-5">
                    <p className = "h3 ml-2 col">
                        Active Rooms
                    </p>

                    <button onClick = {() => {this.setState({page : 1})}} className = "btn btn-outline-success">Create a New Room!</button>


                </div>

                <div className = "container mt-4">
                    <ul className="list-group">
                        {this.state.roomHTML}
                    </ul>
                </div>

            </div>



        </div>
    );
  }

  componentDidMount() {

    axios.get('http://54.153.14.29:3001/rooms')
      .then( (response) => {
        console.log(response);
        this.setState({
            rooms : response.data
        })
        response.data.forEach((room) => {
            this.setState({
                roomHTML : [...this.state.roomHTML, 
                    <li class="list-group-item mt-2">{room} <button onClick={() => this.props.joinRoom(room)} className="btn btn-outline-success float-right" > Join Room</button></li>]
            })
            
        })  
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        
      });
    
    
    
    

    this.setState({
        loading : false
    })
  }
}

export default AllRooms;
