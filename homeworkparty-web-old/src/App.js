import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import VideoChat from './VideoChat';
import TextChat from './components/TextChat';
import LoginPage from './LoginPage';
import firebase from 'firebase';
import Home from './Home';
import { connect } from 'react-redux';
import RoomsHome from './RoomsHome';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyC3mxPhnVBGqpGv0pH6L923xmluzKPsoTU',
  authDomain: 'homeworkparty-79bf2.firebaseapp.com',

};
firebase.initializeApp(config);




class App extends React.Component {
  constructor(props) {
    super(props)

  
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.logIn();

      }
    })
  }

  render() {


    return (
      <div className="App">
        {/* <Provider store={store}> */}
          <Router>
            <Switch>
              <Route path='/video-chat' component = {VideoChat}/>
              <Route path='/text-chat' component = {TextChat} />

              <Route path='/rooms-home' component = {RoomsHome} />
            </Switch>
          </Router>
        {/* </Provider> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      isLogged : state.isLogged
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logIn : () => { dispatch({ type: 'LOG'}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
