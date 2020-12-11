export const initialState = {
  posts: [],
  post: null,
  imagePath: null,
  imageUploadSuccess: false,
  imageUploadLoading: false,
  imageUploadError: null,
  addPostSuccess: false,
  addPostLoading: false,
  addPostError: null,
  loadPostSuccess: false,
  loadPostLoading: false,
  loadPostError: null,
};

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POST_REQUEST:
      return {
        ...state,
        loadPostLoading: true,
        loadPostSuccess: false,
        loadPostError: null,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        loadPostLoading: false,
        loadPostSuccess: true,
        post: action.data.data,
      };
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loadPostLoading: false,
        loadPostError: action.error,
      };
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        imageUploadLoading: true,
        imageUploadSuccess: false,
        imageUploadError: null,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        imageUploadLoading: false,
        imageUploadSuccess: true,
        imagePath: action.data.data,
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        imageUploadLoading: false,
        imageUploadError: action.error,
      };
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostSuccess: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostSuccess: true,
        post: action.data.data,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
