export const initialState = {
  me: null,
  user: null,
  loadMyInfoSuccess: false,
  loadMyInfoLoading: false,
  loadMyInfoError: null,
  loadUserInfoSuccess: false,
  loadUserInfoLoading: false,
  loadUserInfoError: null,
  emailCheckSuccess: false,
  emailCheckLoading: false,
  emailCheckError: null,
  loginSuccess: false,
  loginLoading: false,
  loginError: null,
  logoutSuccess: false,
  logoutLoading: false,
  logoutError: null,
  signUpSuccess: false,
  signUpLoading: false,
  signUpError: null,
  changeNicknameSuccess: false,
  changeNicknameLoading: false,
  changeNicknameError: null,
  changePasswordSuccess: false,
  changePasswordLoading: false,
  changePasswordError: null,
  changeImageSuccess: false,
  changeImageLoading: false,
  changeImageError: null,
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const EMAIL_CHECK_REQUEST = 'EMAIL_CHECK_REQUEST';
export const EMAIL_CHECK_SUCCESS = 'EMAIL_CHECK_SUCCESS';
export const EMAIL_CHECK_FAILURE = 'EMAIL_CHECK_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const CHANGE_IMAGE_REQUEST = 'CHANGE_IMAGE_REQUEST';
export const CHANGE_IMAGE_SUCCESS = 'CHANGE_IMAGE_SUCCESS';
export const CHANGE_IMAGE_FAILURE = 'CHANGE_IMAGE_FAILURE';

export const REMOVE_USER_INFO = 'REMOVE_USER_INFO';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_IMAGE_REQUEST:
      return {
        ...state,
        changeImageLoading: true,
        changeNicknameSuccess: false,
        changePasswordSuccess: false,
        changeImageSuccess: false,
        changeImageError: null,
      };
    case CHANGE_IMAGE_SUCCESS:
      return {
        ...state,
        changeImageLoading: false,
        changeImageSuccess: true,
        me: action.data,
      };
    case CHANGE_IMAGE_FAILURE:
      return {
        ...state,
        changeImageLoading: false,
        changeImageError: action.error,
      };
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordLoading: true,
        changeNicknameSuccess: false,
        changePasswordSuccess: false,
        changeImageSuccess: false,
        changePasswordError: null,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: true,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordError: action.error,
      };
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameSuccess: false,
        changePasswordSuccess: false,
        changeImageSuccess: false,
        changeNicknameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameSuccess: true,
        me: action.data,
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    case LOAD_USER_INFO_REQUEST:
      return {
        ...state,
        loadUserInfoLoading: true,
        loadUserInfoSuccess: false,
        loadUserInfoError: null,
      };
    case LOAD_USER_INFO_SUCCESS:
      return {
        ...state,
        loadUserInfoLoading: false,
        loadUserInfoSuccess: true,
        user: action.data.data,
      };
    case LOAD_USER_INFO_FAILURE:
      return {
        ...state,
        loadUserInfoLoading: false,
        loadUserInfoError: action.error,
      };
    case REMOVE_USER_INFO:
      return {
        ...state,
        loadUserInfoLoading: true,
        loadUserInfoSuccess: false,
        loadUserInfoError: null,
        user: null,
      };
    case LOAD_MY_INFO_REQUEST:
      return {
        ...state,
        loadMyInfoLoading: true,
        loadMyInfoSuccess: false,
        loadMyInfoError: null,
      };
    case LOAD_MY_INFO_SUCCESS:
      return {
        ...state,
        loadMyInfoLoading: false,
        loadMyInfoSuccess: true,
        me: action.data.data,
      };
    case LOAD_MY_INFO_FAILURE:
      return {
        ...state,
        loadMyInfoLoading: false,
        loadMyInfoError: action.error,
        me: null,
      };
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
        emailCheckSuccess: true,
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
        loginSuccess: true,
        me: action.data,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
        logoutSuccess: false,
        logoutError: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: true,
        loginSuccess: false,
        me: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
