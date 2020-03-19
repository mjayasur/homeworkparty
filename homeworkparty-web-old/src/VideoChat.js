import React from 'react';
import openSocket from 'socket.io-client';

import './VideoChat.css'

const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

class VideoChat extends React.Component {
  constructor(props) {
    super(props)

    
    this.state = {
      cameras : [],
      src : null,
      socket : null,
      peerVideos : []
    }
  
  }

  updateCameraList = (cam_list) => {
    
    
    let i = 0;
    let new_list = []
    
    cam_list.forEach(element => new_list.push({
      label : element.label,
      id : element.id
    }));

    this.setState({
      cameras : new_list
    });
    
    
    
  }

  // Fetch an array of devices of a certain type
  getConnectedDevices = async (type) => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log(devices)
      return devices.filter(device => device.kind === type)
  }

  playVideoFromCamera = async () => {
    try {
        const constraints = {'video': true, 'audio': true};
        
        console.log(navigator.mediaDevices)
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.setState({
          src : stream
        })
        this.video.srcObject = stream;
        console.log(stream)
    } catch(error) {
        console.error('Error opening video camera.', error);
    }
}

  componentDidMount() {
    let sock = openSocket('localhost:3001')

    this.setState({socket : sock})

    let constraints = {
      'video': true,
      'audio': true
    }
    console.log(navigator)

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
          console.log('Got MediaStream:', stream);
      })
      .catch(error => {
          console.error('Error accessing media devices.', error);
      });
          // Get the initial set of cameras connected
    const videoCameras = this.getConnectedDevices('videoinput');
    
    videoCameras.then(value => {
      this.updateCameraList(value)
    });

    // Listen for changes to media devices and update the list accordingly
    navigator.mediaDevices.addEventListener('devicechange', event => {
        const newCameraList = this.getConnectedDevices('videoinput');
        this.updateCameraList(newCameraList);
    });
    this.playVideoFromCamera();

    sock.emit('getRoomUsers', this.props.room)


    const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

    
    sock.on('message', async message => {
        if (message.offer) {
            var peerConnection = new RTCPeerConnection(configuration);
            peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
            var answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            sock.emit('answer', answer);
        }
    });


  }

  


  render() {
    if (this.state.cameras.length == 0) {
      return null;
    }
    return (
      <div className="VideoChat">
        <div className = "row">
          <div className = "mt-3 col">

            <p className = "h5">
              {this.props.user}
            </p>
            <video className = "myvideo" muted ref={video => {this.video = video}} autoPlay   />
          </div>

        </div>
      </div>
    );
  }
}

export default VideoChat;
