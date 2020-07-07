const initialState = {
     userLogged: 'samirsms7@gmail.com',
     meetingRefresh:false,
};

export default Reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'COLOR_CHANGED':
          return {
              ...state,
              userLogged: action.payload.userLogged
          };
     case 'EDIT_MEETING':
        return {
           
        }
      default: 
          return state;
  }
};

