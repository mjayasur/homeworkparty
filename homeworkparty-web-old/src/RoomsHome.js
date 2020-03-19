import React from 'react';
import Navbar from './components/Navbar';
import './LoginPage.css'
class RoomsHome extends React.Component {
  constructor() {
    super();
    this.state = {
        displayName : "",
        displayChosen : false,
        
    };
  }
  
  processInput = (e) => {
      this.setState({
          displayName : e.target.value
      });
      if (e.keyCode === 13) {
        this.setState({
            displayChosen : true
        });
      }
  }

  render() {
    if (!this.state.displayChosen){
        return (
            
            <div>
                <Navbar />
                <div>
                    <div className = "row vertical-center"> 
                        <div className = 'container float-center shadow col-5 rounded'>
                            <p className = "h4 mt-5">
                                Choose a display name!

                            </p>
                            <div className = "container mb-5 mt-5">
                                <input onKeyUp={this.processInput} class="form-control form-control-lg" type="text" placeholder="Type a display name!"/>

                            </div>
                            <div className = "container mb-5 mt-5">
                                <button onClick = {() => {}} className = "btn btn-outline-success">Enter the party!</button>

                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    } else {

    }
  }

  componentDidMount() {
    
  }
}

export default RoomsHome;
