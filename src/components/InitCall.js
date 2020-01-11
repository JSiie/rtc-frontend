import {React,  Component}  from 'react';
import { Link } from "react-router-dom";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../reducers/callactions.js';

import './InitCall.css';

export class InitCall extends Component {

    render() {
      
        return (
          <div className="InitCall">
            <div>
              <h1 itemProp="headline">Webrtc Video Room</h1>
              <p>Please enter a room name.</p>
              <input type="text" name="room" value={ this.props.roomID } onChange={event => this.props.setroomID(event)} pattern="^\w+$" maxLength="10" required autoFocus title="Room name should only contain letters or numbers."/>
              <Link className="primary-button" to={ '/r/' + this.props.roomID }>Join</Link>
            </div>
          </div>
        );
      }
}


// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
      roomID: state.callReducer.call.roomID,
    }
  }
  
  // Doing this merges our actions into the component’s props,
  // while wrapping them in dispatch() so that they immediately dispatch an Action.
  // Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(InitCall);