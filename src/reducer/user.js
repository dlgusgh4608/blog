export const initialState = {
  emailCheckSuccess: false,
  emailCheckLodding: false,
  emailCheckError: null,
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const EMAIL_CHECK_REQUEST = 'EMAIL_CHECK_REQUEST';
export const EMAIL_CHECK_SUCCESS = 'EMAIL_CHECK_SUCCESS';
export const EMAIL_CHECK_FAILURE = 'EMAIL_CHECK_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHECK_REQUEST:
      return {
        ...state,
        emailCheckLodding: true,
        emailCheckSuccess: false,
        emailCheckError: null,
      };
    case EMAIL_CHECK_SUCCESS:
      return {
        ...state,
        emailCheckLodding: false,
        emailCheckSuccess: action.data,
      };
    case EMAIL_CHECK_FAILURE:
      return {
        ...state,
        emailCheckLodding: false,
        emailCheckError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
