import React from 'react';
import logo from './rezoom-circle.svg';
import './Navbar.css'


class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <nav className="navbar-custom navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand text-center brand-centered" href="/">
            <img className="mr-2" src={logo} width="60" height="60" alt=""/>
            homework party
        </a>

        </nav>
    );
    }
    return (
        <nav className="navbar-custom navbar navbar-expand-lg navbar-light bg-light">

        <div className="collapse navbar-collapse navbar-header" id="navbarSupportedContent1">
          <ul className="navbar-nav mr-auto">
            <li className ="nav-item">

              <button className="hidden btn btn-light my-2 my-sm-0 btn-custom" onClick={this.logOut}> log out</button>
            </li>
          </ul>
        </div>
        <a className="navbar-brand text-center brand-centered" href="/">
            <img className="mr-2" src={logo} width="60" height="60" alt=""/>
            homework party
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className ="nav-item">

              <button className="btn btn-light my-2 my-sm-0 btn-custom" onClick={this.logOut}> log out</button>
            </li>
          </ul>
        </div>
        </nav>
    );
  }


  componentDidMount() {
    
  }
}



export default Navbar;

