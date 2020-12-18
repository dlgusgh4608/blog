export const initialState = {
  posts: [],
  userPosts: [],
  searchPosts: [],
  post: null,
  imagePath: [],
  imageUploadSuccess: false,
  imageUploadLoading: false,
  imageUploadError: null,
  addPostSuccess: false,
  addPostLoading: false,
  addPostError: null,
  updatePostSuccess: false,
  updatePostLoading: false,
  updatePostError: null,
  loadPostSuccess: false,
  loadPostLoading: false,
  loadPostError: null,
  loadMainPostsSuccess: false,
  loadMainPostsLoading: false,
  loadMainPostsError: null,
  loadUserPostsSuccess: false,
  loadUserPostsLoading: false,
  loadUserPostsError: null,
  addCommentSuccess: false,
  addCommentLoading: false,
  addCommentError: null,
  updateCommentSuccess: false,
  updateCommentLoading: false,
  updateCommentError: null,
  removeCommentSuccess: false,
  removeCommentLoading: false,
  removeCommentError: null,
  removePostSuccess: false,
  removePostLoading: false,
  removePostError: null,
  likePostSuccess: false,
  likePostLoading: false,
  likePostError: null,
  unlikePostSuccess: false,
  unlikePostLoading: false,
  unlikePostError: null,
  searchPostsSuccess: false,
  searchPostsLoading: false,
  searchPostsError: null,
};

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const SEARCH_POST_REQUEST = 'SEARCH_POST_REQUEST';
export const SEARCH_POST_SUCCESS = 'SEARCH_POST_SUCCESS';
export const SEARCH_POST_FAILURE = 'SEARCH_POST_FAILURE';

export const REMOVE_WRITE_IMAGE = 'REMOVE_WRITE_IMAGE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_POST_REQUEST:
      return {
        ...state,
        searchPostsLoading: true,
        searchPostsSuccess: false,
        searchPostsError: null,
        posts: [],
        userPosts: [],
        searchPosts: [],
      };
    case SEARCH_POST_SUCCESS:
      return {
        ...state,
        searchPostsLoading: false,
        searchPostsSuccess: true,
        searchPosts: action.data,
      };
    case SEARCH_POST_FAILURE:
      return {
        ...state,
        searchPostsLoading: false,
        searchPostsError: action.error,
      };
    case LIKE_POST_REQUEST:
      return {
        ...state,
        likePostLoading: true,
        likePostSuccess: false,
        likePostError: null,
      };
    case LIKE_POST_SUCCESS: {
      const post = state.post;
      const liker = post.liker.concat(action.data);
      post.liker = liker;
      return {
        ...state,
        likePostLoading: false,
        likePostSuccess: true,
        post,
      };
    }
    case LIKE_POST_FAILURE:
      return {
        ...state,
        likePostLoading: false,
        likePostError: action.error,
      };
    case UNLIKE_POST_REQUEST:
      return {
        ...state,
        unlikePostLoading: true,
        unlikePostSuccess: false,
        unlikePostError: null,
      };
    case UNLIKE_POST_SUCCESS: {
      const post = state.post;
      const liker = post.liker.filter((v) => v.user_id !== action.data.user_id);
      post.liker = liker;
      return {
        ...state,
        unlikePostLoading: false,
        unlikePostSuccess: true,
        post,
      };
    }
    case UNLIKE_POST_FAILURE:
      return {
        ...state,
        unlikePostLoading: false,
        unlikePostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostSuccess: false,
        removePostError: null,
        post: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        removePostLoading: false,
        removePostSuccess: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentSuccess: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const post = state.post;
      const comment = post.comments.concat(action.data);
      post.comments = comment;
      return {
        ...state,
        addCommentLoading: false,
        addCommentSuccess: true,
        post,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    case UPDATE_COMMENT_REQUEST:
      return {
        ...state,
        updateCommentLoading: true,
        updateCommentSuccess: false,
        updateCommentError: null,
      };
    case UPDATE_COMMENT_SUCCESS: {
      const post = state.post;
      const commentIndex = post.comments.findIndex((v) => v.id === action.data.id);
      post.comments[commentIndex] = action.data;
      return {
        ...state,
        updateCommentLoading: false,
        updateCommentSuccess: true,
        post,
      };
    }
    case UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        updateCommentLoading: false,
        updateCommentError: action.error,
      };
    case REMOVE_COMMENT_REQUEST:
      return {
        ...state,
        removeCommentLoading: true,
        removeCommentSuccess: false,
        removeCommentError: null,
      };
    case REMOVE_COMMENT_SUCCESS: {
      const post = state.post;
      const comments = post.comments.filter((v) => v.id !== action.data.id);
      post.comments = comments;
      return {
        ...state,
        removeCommentLoading: false,
        removeCommentSuccess: true,
        post,
      };
    }
    case REMOVE_COMMENT_FAILURE:
      return {
        ...state,
        removeCommentLoading: false,
        removeCommentError: action.error,
      };
    case LOAD_USER_POSTS_REQUEST:
      return {
        ...state,
        loadUserPostsLoading: true,
        loadUserPostsSuccess: false,
        loadUserPostsError: null,
        posts: [],
        userPosts: [],
        searchPosts: [],
      };
    case LOAD_USER_POSTS_SUCCESS:
      return {
        ...state,
        loadUserPostsLoading: false,
        loadUserPostsSuccess: true,
        userPosts: action.data,
      };
    case LOAD_USER_POSTS_FAILURE:
      return {
        ...state,
        loadUserPostsLoading: false,
        loadUserPostsError: action.error,
      };
    case LOAD_MAIN_POSTS_REQUEST:
      return {
        ...state,
        loadMainPostsLoading: true,
        loadMainPostsSuccess: false,
        loadMainPostsError: null,
        posts: [],
        userPosts: [],
        searchPosts: [],
      };
    case LOAD_MAIN_POSTS_SUCCESS:
      return {
        ...state,
        loadMainPostsLoading: false,
        loadMainPostsSuccess: true,
        posts: action.data,
      };
    case LOAD_MAIN_POSTS_FAILURE:
      return {
        ...state,
        loadMainPostsLoading: false,
        loadMainPostsError: action.error,
      };
    case LOAD_POST_REQUEST:
      return {
        ...state,
        loadPostLoading: true,
        loadPostSuccess: false,
        loadPostError: null,
        post: null,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        loadPostLoading: false,
        loadPostSuccess: true,
        post: action.data,
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
    case UPLOAD_IMAGE_SUCCESS: {
      const imagePath = state.imagePath;
      imagePath[0] = action.data;
      return {
        ...state,
        imageUploadLoading: false,
        imageUploadSuccess: true,
        imagePath,
      };
    }
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
        imagePath: [],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case UPDATE_POST_REQUEST:
      return {
        ...state,
        updatePostLoading: true,
        updatePostSuccess: false,
        updatePostError: null,
        post: null,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        updatePostLoading: false,
        updatePostSuccess: true,
        imagePath: [],
      };
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        updatePostLoading: false,
        updatePostError: action.error,
      };
    case REMOVE_WRITE_IMAGE:
      return {
        ...state,
        imageUploadSuccess: false,
        imagePath: [],
      };
    default:
      return state;
  }
};

export default reducer;
