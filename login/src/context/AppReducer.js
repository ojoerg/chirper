export default (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload
      }

    case "ADD_USER":
      return {
        ...state,
        newUser: action.payload
      }

    default:
      return state;
  }
};
