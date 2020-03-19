import React from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './LoginPage.css'
import Navbar from './components/Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]


};

class LoginPage extends React.Component {
  
  constructor() {
    super();
    this.state = {
      schoolAddrs : {"UC Berkeley" : "https://calbears.com/images/2013/6/7/ANJLCPIXOGYUBNC.20130607192302.jpg?preset=large.socialmediaimage",
                      "UCLA" : "https://brand.ucla.edu/images/identity/logos-and-marks/script-logo.jpg"},
      schoolChosen : "",

    };
  }
  
  selectSchool = (e) => {
    let pressed = e.target.id;
    this.props.insertSchool(pressed)
    this.setState({schoolChosen:pressed});
  }
  render() {

    let schoolButtons = [
      <button class="dropdown-item" href="" id="UC Berkeley" onClick = {this.selectSchool}>UC Berkeley</button>,
    
    ];
    if (this.state.schoolChosen == "") {
      return (
        <div>
            <Navbar loggedIn = {false}></Navbar>

            <div className = "container  ">
                
              <div className = "row vertical-center">


                <div className = 'container col-5 shadow '>
                  <p className = "h5 m-4">
                    Welcome to Homework Party! To Start...
                  </p>
                  <p className = "h5 m-4">
                    Select your school!
                  </p>
                  <div class="dropdown show">
                    <a class="btn btn-outline-success dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      UC Berkeley
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      {schoolButtons}
                    </div>
                  </div>
                  <p className = "h5 m-4">
                    Sign in to the party!
                  </p>
                  <div className = "mb-4">
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

                  </div>
                </div>

                
                <div className = 'container col-7'>
                  <img className = "img-fit" src = {this.state.schoolAddrs["UC Berkeley"]}></img>

                </div>
              </div>
            </div>
            
        </div>
      );
    }
    return (
        
        <div>
            <Navbar loggedIn = {false}></Navbar>

            <div className = "container  ">
                
              <div className = "row vertical-center">


                <div className = 'container col-5 shadow '>
                  <p className = "h5 m-4">
                    Select your school!
                  </p>
                  <div class="dropdown show">
                    <a class="btn btn-outline-success dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {this.state.schoolChosen}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      {schoolButtons}
                    </div>
                  </div>
                  <p className = "h5 m-4">
                    Sign in to the party!
                  </p>
                  <div className = "mb-4">
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

                  </div>
                </div>

                
                <div className = 'container col-7'>
                    <img className = "img-fit" src = {this.state.schoolAddrs[this.state.schoolChosen]}></img>
                </div>
              </div>
            </div>
            
        </div>

    );
  }



  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User signed in, you can get redirect result here if needed.
        // ...
        this.setState({ user : user });
        this.props.insertUser(user)
        this.props.insertSchool(this.state.schoolChosen)
        this.props.logIn();
        
        // ....
      } else {
        // Show sign in screen with button above.
      }
    });
    

  }
}
const mapStateToProps = state => {
  return {
      isLogged : state.isLogged,
      getUser : state.getUser,
      getSchool : state.getSchool
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logIn : () => { dispatch({ type: 'LOG'})},
    insertUser : (user) => { dispatch({type : 'CHANGE_USER', user})},
    insertSchool : (school) => { dispatch({type : 'CHANGE_SCHOOL', school : school})}
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
