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

    default:
      return state;
  }
};
