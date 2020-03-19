import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import TextChat from './components/TextChat';
import VideoChat from './VideoChat';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading : true
    };
  }



  render() {

    if (this.state.loading) {
        return (<div></div>);
    }

    if (!this.props.isLogged) {
        


        return (<Redirect to="/login" />);

    }
    return (

        <div>
            <Navbar loggedIn = {true} />
            <div className = "container">

                <div className="row">
                    <div className = "col-12">
                        <VideoChat user = {this.props.getUser.email}/>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-12">
                        <TextChat user = {this.props.getUser.email} school = {this.props.getSchool}/>
                        

                    </div>

                </div>
            </div>
            
        </div>
    );
  }


  componentDidMount() {
    this.setState({loading : false})
    

  }

}
const mapStateToProps = state => {
    return {
        isLogged : state.isLogged,
        getUser : state.getUser,
        getSchool : state.getSchool
    }
  }


export default connect(mapStateToProps)(Home);
