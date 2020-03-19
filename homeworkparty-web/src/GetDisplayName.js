import React from 'react';

class GetDisplayName extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }
  processInput = (e) => {

    if (e.keyCode === 13) {
        this.props.getDisplayName(e.target.value);
    }
  }

  enterParty = () => {
    this.props.getDisplayName(this.inputRef.current.value);

  }


  render() {
    return (
        <div className="">
            <div className = "row"> 
                <div className = 'container float-center shadow col-5 rounded mb-5'>
                    <p className = "h3 mt-5">
                        Studying alone is tough.

                    </p>
                    <p className = "h5 mt-5 ml-5 mr-5">
                        Luckily, homework party lets you log into anonymous chat rooms, and randomly find friends to chat with! 

                    </p>

                    <p className = "h4 mt-5">
                        Choose a display name!

                    </p>
                    <div className = "container mb-5 mt-5">
                        <input ref={this.inputRef} onKeyUp={this.processInput} className="form-control form-control-lg" type="text" placeholder="Let's keep it PG-13..."/>

                    </div>
                    <div className = "container mb-5 mt-5">
                        <button onClick = {this.enterParty} className = "btn btn-outline-success">Enter the party!</button>

                    </div>
                </div>
            </div>
        </div>

    );
  }

  componentDidMount() {

  }
}

export default GetDisplayName;
