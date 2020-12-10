export const initialState = {
  mainPosts: [],
  imagePath: null,
  imageUploadSuccess: false,
  imageUploadLoading: false,
  imageUploadError: null,
};

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        imagePath: action.data,
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        imageUploadLoading: false,
        imageUploadError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
