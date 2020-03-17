export default (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        message: action.msg,
        loggedIn: true,
        username: action.username
      };

    case "CHANGE_USER":
      return {
        ...state,
        username: action.username,
        message: action.msg
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

    case "LOGOUT_USER":
      return {
        ...state,
        loggedIn: false,
        username: ""
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

    case "CHANGE_ERROR":
      return {
        ...state,
        message: action.msg
      };

    case "AUTHENTICATE_ERROR":
      return {
        ...state,
        loggedIn: false
      };

    case "LOGOUT_ERROR":
      return {
        ...state,
        message: action.msg
      };

    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload
      };

    case "GET_USERS":
      return {
        ...state,
        users: action.payload
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload
      };

    case "TOGGLE_POPUP":
      return {
        ...state,
        popup: action.popup,
        popupType: action.popupType
      };

    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };

    case "POSTS_ERROR":
      return {
        ...state,
        error: action.payload
      };

    case "USERS_ERROR":
      return {
        ...state,
        error: action.payload
      };
    case "USER_ERROR":
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
