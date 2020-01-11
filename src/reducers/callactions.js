export const UPDATE_ROOM_ID = 'UPDATE_ROOM_ID';

export function setroomID(event){
    return{
      type: UPDATE_ROOM_ID,
      payload: event.target.value
    }
  }