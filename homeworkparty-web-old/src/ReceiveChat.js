import React from 'react';

class ReceiveChat extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return;
  }
  

  componentDidMount() {
    this.makeCall();
  }
   makeCall = async (socket) => {
    const peerConnection = new RTCPeerConnection(configuration);
    socket.on('message', async message => {
        if (message.answer) {
            const remoteDesc = new RTCSessionDescription(message.answer);
            await peerConnection.setRemoteDescription(remoteDesc);
        }
    });
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit({'offer': offer});
}
}

export default ReceiveChat;
