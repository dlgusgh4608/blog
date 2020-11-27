export const initialState = {
  emailCheckSuccess: false,
  emailCheckLoading: false,
  emailCheckError: null,
  loginSuccess: false,
  loginLoading: false,
  loginError: null,
  signUpSuccess: false,
  signUpLoading: false,
  signUpError: null,
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const EMAIL_CHECK_REQUEST = 'EMAIL_CHECK_REQUEST';
export const EMAIL_CHECK_SUCCESS = 'EMAIL_CHECK_SUCCESS';
export const EMAIL_CHECK_FAILURE = 'EMAIL_CHECK_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHECK_REQUEST:
      return {
        ...state,
        emailCheckLoading: true,
        emailCheckSuccess: false,
        emailCheckError: null,
      };
    case EMAIL_CHECK_SUCCESS:
      return {
        ...state,
        emailCheckLoading: false,
        emailCheckSuccess: action.data,
      };
    case EMAIL_CHECK_FAILURE:
      return {
        ...state,
        emailCheckLoading: false,
        emailCheckError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpSuccess: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpSuccess: action.data,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginSuccess: false,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: action.data,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
