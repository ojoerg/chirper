export default (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        message: action.msg,
        loggedIn: true,
        username: action.username
      };

    case "AUTHENTICATE_USER":
      return {
        ...state,
        loggedIn: true,
        username: action.username
      };

    case "REGISTER_USER":
      return {
        ...state,
        message: action.msg,
        loggedIn: false
      };

    case "REGISTER_ERROR":
      return {
        ...state,
        message: action.msg,
        loggedIn: false
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        message: action.msg,
        loggedIn: false
      };

    case "AUTHENTICATE_ERROR":
      return {
        ...state,
        loggedIn: false
      };

    case "GET_POSTS":
      return {
        ...state,
        //loading: false,
        posts: action.payload
      };

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
      };

    default:
      return state;
  }
};
