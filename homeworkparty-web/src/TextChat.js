import React from 'react';
import openSocket from 'socket.io-client';
import './TextChat.css'
class TextChat extends React.Component {
  constructor() {
    super();
    this.state = {
      chat : [],
      message : "",
      socket : null,
      loading : true
    };
    this.scrollRef = React.createRef()
    this.inputRef = React.createRef()
  }

  sendMessage = () => {
      this.state.socket.emit('chat-message-offer', this.props.room, this.props.user, this.state.message);
      this.inputRef.current.value = ""
  }
  processInput = (e) => {
    this.setState({message : e.target.value})
    if (e.keyCode === 13) {
        if (this.state.message != "") {
            this.sendMessage();
            e.target.value = ""
        }
        
    }
  }

  scrollDown = () => {
      console.log(this.scrollRef)
      this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    if (this.state.loading) {
        return <div></div>
    }
    return (

        <div>
            <div className = "container mt-4 text-left">
                <div className = "">
                    <p className="h3 ">
                        Chat
                    </p>
                    <ul ref={this.scrollRef} class="list-group chat overflow-auto custom-list">
                        {this.state.chat}
                        <div className = "mt-2" style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </ul>
                </div>
                <div className = "mt-3">

                    <div class="row">
                        <div class="col">
                            <input ref={this.inputRef} type="text"  onKeyUp={this.processInput} class="form-control" placeholder="Type your message"/>
                        </div>
                        <button class="btn btn-primary " onClick={() => {this.sendMessage();}} >Send message</button>

                    </div>

                        

                </div>
            </div>
        </div>
    );
  }

  componentDidMount() {
    
    this.setState({
        socket : this.props.socket,

    })
    

    this.props.socket.on("chat-message", (user, msg) => {

        console.log("hello from chat-message")
        this.setState({
            chat : [...this.state.chat, 
            <li class="list-group-item mt-2">
                <p className = "h6"> {user}</p>
                {msg}
            </li>]
        })

        
        
    })


    
    this.setState({
        loading : false
    })
  }
}

export default TextChat;
