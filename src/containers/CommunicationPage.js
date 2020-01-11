import React from 'react'
import { PropTypes } from 'prop-types';
import Remarkable from 'remarkable'
import Media from './Media'
import Communication from '../components/Communication'
import store from '../reducers/store.js'
import { connect } from 'react-redux'

class CommunicationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sid: '',
      message: '',
      audio: true,
      video: true
    };
    this.handleInvitation = this.handleInvitation.bind(this);
    this.handleHangup = this.handleHangup.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.send = this.send.bind(this);
  }
  hideAuth() {
    this.props.media.setState({bridge: 'connecting'});
  } 
  full() {
    this.props.media.setState({bridge: 'full'});
  }
  componentDidMount() {
    const socket = this.props.socket;
    this.setState({video: this.props.video, audio: this.props.audio});

    socket.on('create', () => {
      console.log('create received');
      this.props.media.setState({user: 'host', bridge: 'create'});
    });
    socket.on('guest connected', () => {
      console.log('guest connected received');
      this.props.media.init();
    });
    socket.on('message', (message) => {
      this.props.media.onMessage(message);
    });
    socket.on('full', this.full);
    socket.on('bridge', role => this.props.media.init());
    socket.on('join', () =>{
      console.log('join');
      this.props.media.setState({user: 'guest', bridge: 'join'});
      this.props.media.init();
    });
    socket.on('approve', ({ message, sid }) => {
      this.props.media.setState({bridge: 'approve'});
      this.setState({ message, sid });
    });
    this.props.getUserMedia
      .then(stream => {
          this.localStream = stream;
          this.localStream.getVideoTracks()[0].enabled = this.state.video;
          this.localStream.getAudioTracks()[0].enabled = this.state.audio;
          socket.emit('find');
        });
  }
  handleInput(e) {
    this.setState({[e.target.dataset.ref]: e.target.value});
  }
  send(e) {
    e.preventDefault();
    this.props.socket.emit('auth', this.state);
    this.hideAuth();
  }
  handleInvitation(e) {
    e.preventDefault();
    this.props.socket.emit([e.target.dataset.ref], this.state.sid);
    this.hideAuth();
  }
  getContent(content) {
    return {__html: (new Remarkable()).render(content)};
  }
  toggleVideo() {
    const video = this.localStream.getVideoTracks()[0].enabled = !this.state.video;
    this.setState({video: video});
    this.props.setVideo(video);
  }
  toggleAudio() {
    const audio = this.localStream.getAudioTracks()[0].enabled = !this.state.audio;
    this.setState({audio: audio});
    this.props.setAudio(audio);
  }
  handleHangup() {
    this.props.media.hangup();
  }
  render(){
    return (
      <Communication
        {...this.state}
        toggleVideo={this.toggleVideo}
        toggleAudio={this.toggleAudio}
        getContent={this.getContent}
        send={this.send}
        handleHangup={this.handleHangup}
        handleInput={this.handleInput}
        handleInvitation={this.handleInvitation} />
    );
  }
}
const mapStateToProps = store => ({video: store.video, audio: store.audio});
const mapDispatchToProps = dispatch => (
  {
    setVideo: boo => store.dispatch({type: 'SET_VIDEO', video: boo}),
    setAudio: boo => store.dispatch({type: 'SET_AUDIO', audio: boo})
  }
);

CommunicationPage.propTypes = {
  socket: PropTypes.object.isRequired,
  getUserMedia: PropTypes.object.isRequired,
  audio: PropTypes.bool.isRequired,
  video: PropTypes.bool.isRequired,
  setVideo: PropTypes.func.isRequired,
  setAudio: PropTypes.func.isRequired,
  media: PropTypes.instanceOf(Media)
};
export default connect(mapStateToProps, mapDispatchToProps)(CommunicationPage);