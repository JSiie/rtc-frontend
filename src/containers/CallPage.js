import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../reducers/store.js'; 
import Media from './Media.js';
import CommunicationPage from './CommunicationPage';
import { connect } from 'react-redux';
import io from 'socket.io-client';


class CallPage extends Component {
    constructor(props) {
        super(props);
        this.getUserMedia = navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        }).catch(e => alert('getUserMedia() error: ' + e.name))
        if (!process.env.NODE_ENV || process.env.NODE_ENV != 'production') {
          // dev code
          this.socket = io.connect('http://127.0.0.1:3000');
        } else {
          // production code
          this.socket = io.connect('http://myserver:3000');
        }
      }

    componentDidMount() {
        this.props.addRoom();
    }


    render(){
        return (
          <div>
            <Media media={media => this.media = media} socket={this.socket} getUserMedia={this.getUserMedia} />
            <CommunicationPage socket={this.socket} media={this.media} getUserMedia={this.getUserMedia} />
          </div>
        );
    }
}

const mapStateToProps = store => ({rooms: new Set([...store.rooms])});
const mapDispatchToProps = (dispatch, ownProps) => (
    {
      addRoom: () => store.dispatch({ type: 'ADD_ROOM', room: ownProps.match.params.room })
    }
  );
export default connect(mapStateToProps, mapDispatchToProps)(CallPage);