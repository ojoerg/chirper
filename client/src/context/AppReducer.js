export default (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        //loading: false,
        posts: action.payload
      }
    case "TOGGLE_POPUP":
      return {
        ...state,
        popup: action.payload
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    case "POST_ERROR":
      return {
        ...state,
        error: action.payload
      }

    
    default:
      return state;
  }
};
