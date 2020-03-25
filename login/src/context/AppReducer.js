export default (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        message: action.msg,
        loggedIn: true,
        username: action.username,
        follows: action.follows
      };

    case "CHANGE_USER":
      return {
        ...state,
        username: action.username,
        user: action.user,
        message: action.msg
      };

    case "AUTHENTICATE_USER":
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        follows: action.follows
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
        error: action.msg,
        loggedIn: false
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.msg,
        loggedIn: false
      };

    case "CHANGE_ERROR":
      return {
        ...state,
        error: action.msg
      };

    case "AUTHENTICATE_ERROR":
      return {
        ...state,
        loggedIn: false
      };

    case "LOGOUT_ERROR":
      return {
        ...state,
        error: action.msg
      };

    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload
      };

    case "GET_POSTS_FROM_FOLLOWED_USERS":
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

    case "TOGGLE_ALLPOSTS":
      return {
        ...state,
        allPosts: action.allPosts
      };

    case "CLEAR_MESSAGES":
      return {
        ...state,
        message: ""
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: ""
      };

    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };

    case "ADD_FOLLOW":
      return {
        ...state,
        follows: [...state.follows, action.payload]
      };

    case "POSTS_ERROR":
      return {
        ...state,
        error: action.payload
      };

    case "POSTS_FROM_FOLLOWED_USERS_ERROR":
      return {
        ...state,
        error: action.payload
      };

    case "FOLLOW_ERROR":
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
