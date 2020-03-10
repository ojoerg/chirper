export default (state, action) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.payload
      };

    case "LOGIN_USER":
      return {
        ...state,
        page: "home",
        message: action.payload
      };

    case "REGISTER_USER":
      return {
        ...state,
        page: "login",
        message: action.payload
      };

    case "REGISTER_ERROR":
      return {
        ...state,
        page: "register",
        message: action.payload
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        page: "login",
        message: action.payload
      };

    default:
      return state;
  }
};
