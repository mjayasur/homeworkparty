import React from 'react';
import Navbar from './Navbar';

class CreateRoom extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    

  }

  processInput = (e) => {
    if (e.keyCode === 13) {
        this.props.createRoom(e.target.value);
    }
  }
  createNewRoom = () => {
    this.props.createRoom(this.inputRef.current.value);
  }

  render() {
    return (
        <div>
            <Navbar></Navbar>
            <div className = "container mt-5">
                <div className = "container float-center">
                    <p className = "h3 mt-3">
                        Name your room:
                    </p>
                    <input ref={this.inputRef} type="text"  onKeyUp={this.processInput} className = "form-control mt-3" placeholder="e.x. EE16B Study Group" />
                    <button className = "btn btn-outline-success mt-3" onClick = {this.createNewRoom}>Create Your Room</button>
                </div>
            </div>
        </div>
    );
  }

  componentDidMount() {

  }
}

export default CreateRoom;
